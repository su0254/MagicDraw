export interface Drawing {
  id: string
  title: string
  categoryId: string
  category?: string
  userId: string
  user?: string
  status: "approved" | "pending" | "rejected"
  imageUrl: string
  views: number
  likes: number
  createdAt: string
  updatedAt: string
}
