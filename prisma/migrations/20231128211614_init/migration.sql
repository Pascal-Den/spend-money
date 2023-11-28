-- CreateTable
CREATE TABLE "Oligarch" (
    "id" TEXT NOT NULL,
    "personName" TEXT NOT NULL,
    "squareImage" TEXT NOT NULL,
    "netWorth" DOUBLE PRECISION NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "Oligarch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Good" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);
