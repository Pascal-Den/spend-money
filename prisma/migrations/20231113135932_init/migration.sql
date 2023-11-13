-- CreateTable
CREATE TABLE "Oligarch" (
    "id" TEXT NOT NULL,
    "personName" TEXT NOT NULL,
    "squareImage" TEXT NOT NULL,
    "netWorth" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Oligarch_pkey" PRIMARY KEY ("id")
);
