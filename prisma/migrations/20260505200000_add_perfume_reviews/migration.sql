-- CreateTable
CREATE TABLE "PerfumeReview" (
    "id" TEXT NOT NULL,
    "perfumeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "longevity" INTEGER NOT NULL,
    "sillage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerfumeReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewHelpfulVote" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewHelpfulVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PerfumeReview_userId_perfumeId_key" ON "PerfumeReview"("userId", "perfumeId");

-- CreateIndex
CREATE INDEX "PerfumeReview_perfumeId_idx" ON "PerfumeReview"("perfumeId");

-- CreateIndex
CREATE INDEX "PerfumeReview_createdAt_idx" ON "PerfumeReview"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewHelpfulVote_reviewId_userId_key" ON "ReviewHelpfulVote"("reviewId", "userId");

-- CreateIndex
CREATE INDEX "ReviewHelpfulVote_reviewId_idx" ON "ReviewHelpfulVote"("reviewId");

-- AddForeignKey
ALTER TABLE "PerfumeReview" ADD CONSTRAINT "PerfumeReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewHelpfulVote" ADD CONSTRAINT "ReviewHelpfulVote_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "PerfumeReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewHelpfulVote" ADD CONSTRAINT "ReviewHelpfulVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
