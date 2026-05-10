export type PublicStatsPayload = {
  totalReviews: number
  byPerfumeId: Record<string, { count: number; avgRating: number }>
  forumThreadCount: number
}
