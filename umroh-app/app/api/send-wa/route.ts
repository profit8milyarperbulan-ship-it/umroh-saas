import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: {
      "Authorization": "YS5V3rX7ZstHgUU1Ynmm",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      target: body.phone,
      message: body.message,
    }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}