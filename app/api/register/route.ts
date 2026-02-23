import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    // ✅ Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    // ✅ Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user in DB
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone },
    });

    // ✅ Generate email verification token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    // ✅ Send verification email via Resend
    try {
      const res = await axios.post(
        "https://api.resend.com/emails",
        {
          from: "Hotel Booking <onboarding@resend.dev>", // Must be verified in Resend
          to: email,
          subject: "Verify your email",
          html: `<p>Hi ${name}, click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Resend response:", res.data);
    } catch (axiosErr: any) {
      console.error("Resend Axios Error:", axiosErr.response?.data || axiosErr.message);
      // You can still return success to user, email might fail but account created
    }

    // ✅ Return success
    return NextResponse.json(
      { message: "User created. Check your email to verify." },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Register API Error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}