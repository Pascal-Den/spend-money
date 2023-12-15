import { prisma } from "@/core/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const admin = await prisma.admin.findUnique({
    where: {
      id: "1",
    },
  });

  const enteredUser = await req.json();

  const enteredPassword = enteredUser.password;

  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(enteredPassword, admin.password);

  if (!passwordMatch) {
    return NextResponse.json({ isSuccess: passwordMatch }, { status: 400 });
  }

  return NextResponse.json({ isSuccess: passwordMatch }, { status: 200 });
}
