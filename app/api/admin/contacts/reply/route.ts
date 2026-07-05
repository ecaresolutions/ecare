import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Contact, Page } from "@/lib/models";
import { isAuthenticated } from "@/lib/auth";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id, replyMessage } = await request.json();

    if (!id || !replyMessage || !replyMessage.trim()) {
      return NextResponse.json({ success: false, error: "Invalid parameters" }, { status: 400 });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact ticket not found" }, { status: 404 });
    }

    // Attempt to load SMTP settings for sending the email
    const smtpDoc = await Page.findOne({ key: "smtp_settings" });
    let emailSent = false;
    let emailError = "";

    if (smtpDoc && smtpDoc.content && smtpDoc.content.en) {
      try {
        const smtpSettings = JSON.parse(smtpDoc.content.en);
        if (smtpSettings.host && smtpSettings.authEmail && smtpSettings.authPass) {
          const transporter = nodemailer.createTransport({
            host: smtpSettings.host,
            port: Number(smtpSettings.port || 465),
            secure: smtpSettings.secure === "true",
            auth: {
              user: smtpSettings.authEmail,
              pass: smtpSettings.authPass
            }
          });

          const mailOptions = {
            from: `"${smtpSettings.senderName || 'Ecare Support'}" <${smtpSettings.authEmail}>`,
            to: contact.email,
            subject: `Re: ${contact.subject || 'Support Ticket Reply'}`,
            text: replyMessage,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="background-color: #ef4444; padding: 20px; text-align: center; color: white;">
                  <h2 style="margin: 0; font-size: 20px;">Ecare Live Support Reply</h2>
                </div>
                <div style="padding: 24px; background-color: #ffffff;">
                  <p>Hi <strong>${contact.name}</strong>,</p>
                  <p>Our support team has responded to your live chat ticket:</p>
                  
                  <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #ef4444; border-radius: 4px; margin: 20px 0; font-style: italic; color: #475569;">
                    "${contact.message.split("\n\n[Reply Sent")[0]}"
                  </div>

                  <p style="font-weight: bold; color: #0f172a; margin-top: 24px;">Support Agent Response:</p>
                  <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; color: #1e293b; white-space: pre-line;">
                    ${replyMessage}
                  </div>

                  <p style="margin-top: 30px; font-size: 13px; color: #64748b;">
                    If you have further questions, you can reply directly to this email.
                  </p>
                </div>
                <div style="background-color: #f8fafc; padding: 12px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-t: 1px solid #e2e8f0;">
                  © ${new Date().getFullYear()} Ecare Solutions. All rights reserved.
                </div>
              </div>
            `
          };

          await transporter.sendMail(mailOptions);
          emailSent = true;
        }
      } catch (e: any) {
        console.error("Nodemailer failed in Chat Reply API:", e);
        emailError = e.message;
      }
    }

    // Append the reply to the conversation log and mark as read
    const updatedConversation = `${contact.message}\n\n[Reply Sent on ${new Date().toLocaleString()}]:\n${replyMessage}`;
    const updatedContact = await Contact.findByIdAndUpdate(
      id, 
      { message: updatedConversation, status: "read" }, 
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: emailSent 
        ? "Reply sent successfully via email!" 
        : "Reply saved in database. (Email was not sent because SMTP settings are not configured in Admin > Settings)",
      emailSent,
      emailError: emailError || undefined,
      data: updatedContact
    });
  } catch (error: any) {
    console.error("Admin Chat Reply API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
