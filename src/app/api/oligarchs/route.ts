import { prisma } from "@/core/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const oligarchs = await prisma.oligarch.findMany();

  return NextResponse.json(oligarchs);
}
