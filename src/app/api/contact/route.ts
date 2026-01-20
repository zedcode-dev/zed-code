import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ============================================
// Rate Limiting Configuration
// ============================================
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

// In-memory store for rate limiting (resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: Request): string {
    // Get IP from headers (works with most hosting providers)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
        // New window
        rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
    }

    record.count++;
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetIn: record.resetTime - now };
}

// ============================================
// Input Sanitization (XSS Prevention)
// ============================================
function escapeHtml(text: string): string {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// API Handler
// ============================================
export async function POST(request: Request) {
    try {
        // Check rate limit
        const rateLimitKey = getRateLimitKey(request);
        const rateLimit = checkRateLimit(rateLimitKey);

        if (!rateLimit.allowed) {
            const minutesRemaining = Math.ceil(rateLimit.resetIn / 60000);
            return NextResponse.json(
                { error: `Too many requests. Please try again in ${minutesRemaining} minutes.` },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { projectType, budget, timeline, description, name, email, company, phone } = body;

        // Validate required fields
        if (!name || !email || !projectType || !budget || !timeline) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Sanitize all inputs
        const sanitized = {
            name: escapeHtml(name),
            email: escapeHtml(email),
            company: escapeHtml(company || ""),
            phone: escapeHtml(phone || ""),
            projectType: escapeHtml(projectType),
            budget: escapeHtml(budget),
            timeline: escapeHtml(timeline),
            description: escapeHtml(description || ""),
        };

        // Create transporter with SMTP credentials
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const htmlContent = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Project Inquiry</h1>
                    <p style="color: #a0a0a0; margin: 8px 0 0; font-size: 14px;">from Zed Code Website</p>
                </div>

                <div style="background: #f9fafb; border-radius: 16px; padding: 24px; margin-bottom: 16px;">
                    <h2 style="color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">Contact Information</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Name</td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${sanitized.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;"><a href="mailto:${sanitized.email}" style="color: #111827; text-decoration: none;">${sanitized.email}</a></td>
                        </tr>
                        ${sanitized.company ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Company</td><td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${sanitized.company}</td></tr>` : ""}
                        ${sanitized.phone ? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${sanitized.phone}</td></tr>` : ""}
                    </table>
                </div>

                <div style="background: #f9fafb; border-radius: 16px; padding: 24px; margin-bottom: 16px;">
                    <h2 style="color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">Project Details</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Project Type</td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${sanitized.projectType}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Budget</td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${sanitized.budget}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Timeline</td>
                            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${sanitized.timeline}</td>
                        </tr>
                    </table>
                </div>

                ${sanitized.description ? `
                <div style="background: #f9fafb; border-radius: 16px; padding: 24px;">
                    <h2 style="color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">Project Description</h2>
                    <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0;">${sanitized.description}</p>
                </div>
                ` : ""}

                <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">This email was sent from the Zed Code contact form</p>
                </div>
            </div>
        `;

        // Send email
        await transporter.sendMail({
            from: `"Zed Code Website" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: sanitized.email,
            subject: `New Project Inquiry: ${sanitized.projectType} from ${sanitized.name}`,
            html: htmlContent,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
