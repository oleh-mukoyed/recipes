-- CreateTable
CREATE TABLE "MeasurementName" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "locale" VARCHAR(255) NOT NULL,
    "measurementId" INTEGER NOT NULL,

    CONSTRAINT "MeasurementName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasurementShortName" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "locale" VARCHAR(255) NOT NULL,
    "measurementId" INTEGER NOT NULL,

    CONSTRAINT "MeasurementShortName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementName_measurementId_key" ON "MeasurementName"("measurementId");

-- CreateIndex
CREATE UNIQUE INDEX "MeasurementShortName_measurementId_key" ON "MeasurementShortName"("measurementId");

-- AddForeignKey
ALTER TABLE "MeasurementName" ADD CONSTRAINT "MeasurementName_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementShortName" ADD CONSTRAINT "MeasurementShortName_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
