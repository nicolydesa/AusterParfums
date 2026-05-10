export const FORUM_CATEGORY_VALUES = [
  "Recomendações",
  "Discussão",
  "Coleções",
  "Educação",
  "Notícias",
] as const

export type ForumCategory = (typeof FORUM_CATEGORY_VALUES)[number]

export function isForumCategory(s: string): s is ForumCategory {
  return (FORUM_CATEGORY_VALUES as readonly string[]).includes(s)
}

export function categoryBadgeClass(category: string): string {
  if (category === "Recomendações") return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200"
  if (category === "Discussão") return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
  if (category === "Coleções") return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200"
  if (category === "Educação") return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
  if (category === "Notícias") return "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-200"
  return "bg-muted text-muted-foreground"
}
