export interface User {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  role: "Student" | "Teacher" | "Admin"
  drawings: number
  lastActive: string
  avatar?: string
  createdAt: string
  updatedAt: string
}
