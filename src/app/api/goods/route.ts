import { prisma } from "@/core/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const goods = await prisma.good.findMany();

  return NextResponse.json(goods);
}
