import { prisma } from "@/core/prisma";
import { NextResponse } from "next/server";

export interface OligarchRouteContext {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: OligarchRouteContext) {
  const { id } = params;

  const person = await prisma.oligarch.findUnique({
    where: {
      id,
    },
  });

  if (!person) {
    return NextResponse.json({
      code: "not_found",
      messages: "Person not found",
    });
  }

  return NextResponse.json(person);
}
