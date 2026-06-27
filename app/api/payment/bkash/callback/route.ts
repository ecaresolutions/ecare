import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Page, Order } from "@/lib/models";
import nodemailer from "nodemailer";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const paymentID = searchParams.get("paymentID");
  const status = searchParams.get("status");

  const baseOrigin = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;

  if (status !== "success" || !paymentID) {
    // Update order to failed status if pending order is found
    try {
      await dbConnect();
      await Order.findOneAndUpdate({ paymentID }, { paymentStatus: "failed" });
    } catch (e) {
      console.error("Failed to mark order as failed:", e);
    }
    return NextResponse.redirect(`${baseOrigin}/checkout?paymentStatus=failed`);
  }

  try {
    await dbConnect();

    // Find the pending order first
    const pendingOrder = await Order.findOne({ paymentID });
    if (!pendingOrder) {
      return NextResponse.redirect(`${baseOrigin}/checkout?paymentStatus=failed&error=order_not_found`);
    }

    const dbSettingsDoc = await Page.findOne({ key: "bkash_settings" });
    let dbSettings: any = {};
    if (dbSettingsDoc && dbSettingsDoc.content && dbSettingsDoc.content.en) {
      try {
        dbSettings = JSON.parse(dbSettingsDoc.content.en);
      } catch (e) {
        dbSettings = {};
      }
    }

    const apiUrl = dbSettings.apiUrl || process.env.BKASH_API_URL || "https://tokenized.sandbox.bka.sh/v1.2.0-beta";
    const username = dbSettings.username || process.env.BKASH_USERNAME;
    const password = dbSettings.password || process.env.BKASH_PASSWORD;
    const appKey = dbSettings.appKey || process.env.BKASH_APP_KEY;
    const appSecret = dbSettings.appSecret || process.env.BKASH_APP_SECRET;

    if (!username || !password || !appKey || !appSecret) {
      return NextResponse.redirect(`${baseOrigin}/checkout?paymentStatus=failed&error=missing_credentials`);
    }

    // Step 1: Grant Token to authorize Execute Payment
    const tokenRes = await fetch(`${apiUrl}/tokenized/checkout/token/grant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "username": username,
        "password": password,
        "app_key": appKey,
        "app_secret": appSecret,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        app_key: appKey,
        app_secret: appSecret
      })
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.id_token) {
      return NextResponse.redirect(`${baseOrigin}/checkout?paymentStatus=failed&error=token_grant_failed`);
    }

    const idToken = tokenData.id_token;

    // Step 2: Execute Payment
    const executeRes = await fetch(`${apiUrl}/tokenized/checkout/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: idToken,
        "X-APP-Key": appKey,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({ paymentID })
    });

    const executeData = await executeRes.json();

    if (!executeRes.ok || executeData.statusCode !== "0000" || !executeData.trxID) {
      console.error("bKash Payment Execution Failed:", executeData);
      await Order.findOneAndUpdate({ paymentID }, { paymentStatus: "failed" });
      return NextResponse.redirect(`${baseOrigin}/checkout?paymentStatus=failed&error=${executeData.statusMessage || "execution_failed"}`);
    }

    const trxID = executeData.trxID;

    // Step 3: Generate License Keys & Download Token
    const licenseKey = "EZY-PRO-" + 
      Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + 
      Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + 
      Math.random().toString(36).substring(2, 6).toUpperCase();

    const downloadToken = "dl-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Update order status to paid in database
    const updatedOrder = await Order.findOneAndUpdate(
      { paymentID },
      {
        paymentStatus: "paid",
        trxID,
        licenseKeys: [licenseKey],
        downloadToken
      },
      { new: true }
    );

    // Step 4: SMTP Mail Delivery
    try {
      const smtpDoc = await Page.findOne({ key: "smtp_settings" });
      if (smtpDoc && smtpDoc.content && smtpDoc.content.en) {
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

          const downloadUrl = `${baseOrigin}/api/payment/download?token=${downloadToken}`;

          // Email Content for Customer
          const customerHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
              <h2 style="color: #e2136e; border-bottom: 2px solid #e2136e; padding-bottom: 10px;">Purchase Confirmation 🎉</h2>
              <p>Hi <strong>${updatedOrder.name}</strong>,</p>
              <p>Your payment via bKash has been processed successfully. Below are your order details:</p>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1e293b;">Order Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="border-bottom: 1px solid #e2e8f0; text-align: left;">
                      <th style="padding: 8px 0;">Product</th>
                      <th style="padding: 8px 0; text-align: right;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${updatedOrder.items.map((item: any) => `
                      <tr>
                        <td style="padding: 8px 0;">${item.title} (x${item.quantity})</td>
                        <td style="padding: 8px 0; text-align: right;">৳${item.price}</td>
                      </tr>
                    `).join('')}
                    <tr style="border-top: 2px solid #e2e8f0; font-weight: bold;">
                      <td style="padding: 12px 0 0 0;">Total Paid:</td>
                      <td style="padding: 12px 0 0 0; text-align: right; color: #e2136e;">৳${updatedOrder.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h3 style="color: #166534; margin-top: 0;">Plugin Download & License</h3>
                <p>Use the details below to download and activate your WordPress plugin:</p>
                <p><strong>License Key:</strong> <code style="background-color: #dcfce7; padding: 6px 12px; border-radius: 6px; font-family: monospace; font-size: 14px; color: #15803d; border: 1px dashed #bbf7d0;">${licenseKey}</code></p>
                <p style="margin-top: 15px;">
                  <a href="${downloadUrl}" style="display: inline-block; background-color: #15803d; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Download Ezy Checkout Pro
                  </a>
                </p>
              </div>

              <p style="font-size: 11px; color: #64748b; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                Transaction ID: ${trxID}<br>
                Order ID: ${updatedOrder._id}<br>
                Need support? Feel free to contact us at info@ecare.com
              </p>
            </div>
          `;

          // Email Content for Admin
          const adminHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
              <h2 style="color: #0f172a; border-bottom: 2px solid #0f172a; padding-bottom: 10px;">New Sales Alert! 🚀</h2>
              <p>Hello Admin,</p>
              <p>A new order has been completed on the Ecare platform. Details below:</p>
              <ul>
                <li><strong>Customer:</strong> ${updatedOrder.name}</li>
                <li><strong>Email:</strong> ${updatedOrder.email}</li>
                <li><strong>Phone:</strong> ${updatedOrder.phone}</li>
                <li><strong>Company:</strong> ${updatedOrder.company || "N/A"}</li>
                <li><strong>Total Paid:</strong> ৳${updatedOrder.totalAmount}</li>
                <li><strong>bKash Transaction ID:</strong> ${trxID}</li>
              </ul>
            </div>
          `;

          // Send Customer Email
          await transporter.sendMail({
            from: `"${smtpSettings.senderEmail ? 'Ecare Checkout' : 'Ecare'}" <${smtpSettings.senderEmail || smtpSettings.authEmail}>`,
            to: updatedOrder.email,
            subject: "Your Ecare Purchase Details & License Key",
            html: customerHtml
          });

          // Send Admin Email
          if (smtpSettings.adminNoticeEmail) {
            await transporter.sendMail({
              from: `"${smtpSettings.senderEmail ? 'Ecare Sales' : 'Ecare'}" <${smtpSettings.senderEmail || smtpSettings.authEmail}>`,
              to: smtpSettings.adminNoticeEmail,
              subject: `New Order Completed - ৳${updatedOrder.totalAmount}`,
              html: adminHtml
            });
          }
        }
      }
    } catch (mailErr) {
      console.error("Failed to send order emails:", mailErr);
    }

    // Redirect user to success page with transaction ID and Order ID
    return NextResponse.redirect(
      `${baseOrigin}/checkout?paymentStatus=success&trxID=${trxID}&orderID=${updatedOrder._id}`
    );
  } catch (error: any) {
    console.error("bKash Callback Processing Exception:", error);
    return NextResponse.redirect(`${baseOrigin}/checkout?paymentStatus=failed&error=exception`);
  }
}
