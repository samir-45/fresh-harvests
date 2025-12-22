import { NextResponse } from "next/server";

export const runtime = "nodejs";

const API_BASE = "http://23.239.111.164:5001/api/v1";

type Ctx = { params: Promise<{ path: string[] }> };

async function forward(req: Request, ctx: Ctx) {
  const { path } = await ctx.params; // Next 15/16 way [web:255]

  const url = new URL(req.url);
  const targetUrl = `${API_BASE}/${path.join("/")}${url.search}`;

  const method = req.method.toUpperCase();
  const body = method === "GET" || method === "HEAD" ? undefined : await req.text();

  const headers = new Headers();
  const auth = req.headers.get("authorization");
  if (auth) headers.set("authorization", auth);
  headers.set("content-type", req.headers.get("content-type") || "application/json");

  const upstream = await fetch(targetUrl, { method, headers, body, cache: "no-store" });
  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.status,
    headers: { "content-type": upstream.headers.get("content-type") || "application/json" },
  });
}

export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
