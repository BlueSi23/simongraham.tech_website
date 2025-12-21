import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createContactSubmission } from "../../../lib/firestore";
import { ContactSubmission } from "../../../lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      organisation?: string;
      brief?: string;
      timing?: ContactSubmission["timing"];
      budget?: ContactSubmission["budget"];
      duration?: string;
    };

    const errors: Record<string, string> = {};
    if (!body.name?.trim()) errors.name = "Name is required";
    if (!body.email?.trim()) errors.email = "Email is required";
    else if (!/^[^\s]+@[^\s]+\.[^\s]+$/.test(body.email)) {
      errors.email = "Invalid email";
    }
    if (!body.organisation?.trim())
      errors.organisation = "Organisation is required";
    if (!body.brief?.trim()) errors.brief = "Brief is required";
    if (!body.timing) errors.timing = "Timing is required";
    if (!body.budget) errors.budget = "Budget is required";
    if (!body.duration) errors.duration = "Duration is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const submission: Omit<ContactSubmission, "id" | "submittedAt" | "read"> = {
      name: body.name!,
      email: body.email!,
      organisation: body.organisation!,
      brief: body.brief!,
      timing: body.timing!,
      budget: body.budget!,
    };

    await createContactSubmission(submission);

    // Send email via SMTP (Namecheap)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_RECIPIENT_EMAIL || "enquiries@simongraham.tech";

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Website Contact Form" <${smtpUser}>`,
        to: toEmail,
        replyTo: body.email,
        subject: `New contact submission from ${submission.name}`,
        text: [
          `Name: ${submission.name}`,
          `Email: ${submission.email}`,
          `Organisation: ${submission.organisation}`,
          `Timing: ${submission.timing}`,
          `Budget: ${submission.budget}`,
          `Duration: ${body.duration}`,
          "",
          "Message:",
          submission.brief,
        ].join("\n"),
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
          <p><strong>Organisation:</strong> ${submission.organisation}</p>
          <p><strong>Timing:</strong> ${submission.timing}</p>
          <p><strong>Budget:</strong> ${submission.budget}</p>
          <p><strong>Duration:</strong> ${body.duration}</p>
          <h3>Message:</h3>
          <p>${submission.brief.replace(/\n/g, '<br>')}</p>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}






