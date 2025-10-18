import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new Response("Missing URL", { status: 400 });

  const res = await fetch(url);
  const blob = await res.arrayBuffer();

  return new Response(blob, {
    headers: { "Content-Type": res.headers.get("Content-Type") || "image/jpeg" },
  });
}
