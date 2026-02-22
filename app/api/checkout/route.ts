import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const { amount } = await req.json(); // dynamic amount

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: "Hotel Booking Payment",
          },
          unit_amount: amount * 100, // Stripe uses paisa
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}