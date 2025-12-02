import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Contact form submission:', { name, email, message });

    // Option 1: Send to Resend if API key exists
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const response = await resend.emails.send({
          from: 'Contact Form <onboarding@resend.dev>',
          to: process.env.CONTACT_EMAIL || 'admin@example.com',
          replyTo: email,
          subject: `New Contact Message from ${name}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        return NextResponse.json(
          { message: 'Email sent successfully', success: true },
          { status: 200 }
        );
      } catch (resendError) {
        console.error('Resend error:', resendError);
        // Fall through to webhook option
      }
    }

    // Option 2: Send to Discord webhook if available
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const discordResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [
              {
                title: `New Contact Message from ${name}`,
                fields: [
                  { name: 'Email', value: email, inline: true },
                  { name: 'Name', value: name, inline: true },
                  { name: 'Message', value: message },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });

        if (discordResponse.ok) {
          return NextResponse.json(
            { message: 'Message received successfully', success: true },
            { status: 200 }
          );
        }
      } catch (discordError) {
        console.error('Discord error:', discordError);
      }
    }

    // Option 3: Fallback - return success and log to console
    // In production, this would save to database
    console.log('✅ Contact form message logged:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message:
          'Message received! (For production, configure RESEND_API_KEY or DISCORD_WEBHOOK_URL)',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}
