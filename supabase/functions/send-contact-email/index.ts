import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RECIPIENT_EMAIL = "mohanapriyamk2005@gmail.com";
const FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";
const RATE_LIMIT_PER_HOUR = 3;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { name, email, subject, message, _honeypot } = body;

    // Honeypot: bots fill hidden fields; silently accept and discard
    if (_honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return new Response(JSON.stringify({ error: "Name must be at least 2 characters." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "A valid email address is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!subject || typeof subject !== "string" || subject.trim().length < 5) {
      return new Response(JSON.stringify({ error: "Subject must be at least 5 characters." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return new Response(JSON.stringify({ error: "Message must be at least 10 characters." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const clientIP =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Rate limiting: check submissions from this IP in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIP)
      .gte("submitted_at", oneHourAgo);

    if (countError) {
      console.error("Rate limit check failed:", countError.message);
    }

    if (count !== null && count >= RATE_LIMIT_PER_HOUR) {
      return new Response(
        JSON.stringify({ error: "Too many submissions from your address. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert the message into the database
    const { data: insertedRow, error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        ip_address: clientIP,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !insertedRow) {
      throw new Error("Failed to store message in database.");
    }

    const messageId = insertedRow.id;
    const timestamp = new Date().toISOString();

    // Send email via Resend if API key is configured
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — message stored but email not sent.");
      await supabase
        .from("contact_messages")
        .update({ status: "stored_no_email" })
        .eq("id", messageId);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Your message has been received.",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailBody = {
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      reply_to: email.trim(),
      subject: `Portfolio Contact: ${subject.trim()}`,
      text: [
        `New contact form submission`,
        ``,
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Subject: ${subject.trim()}`,
        `Submitted at: ${timestamp}`,
        ``,
        `Message:`,
        `${message.trim()}`,
      ].join("\n"),
      html: [
        `<h2>New Contact Form Submission</h2>`,
        `<p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>`,
        `<p><strong>Subject:</strong> ${escapeHtml(subject.trim())}</p>`,
        `<p><strong>Submitted at:</strong> ${timestamp}</p>`,
        `<h3>Message:</h3>`,
        `<p>${escapeHtml(message.trim()).replace(/\n/g, "<br>")}</p>`,
      ].join(""),
    };

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      await supabase
        .from("contact_messages")
        .update({ status: "email_failed" })
        .eq("id", messageId);

      return new Response(
        JSON.stringify({ error: "Failed to send email. Please try again later." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark as sent
    await supabase
      .from("contact_messages")
      .update({ status: "sent" })
      .eq("id", messageId);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
