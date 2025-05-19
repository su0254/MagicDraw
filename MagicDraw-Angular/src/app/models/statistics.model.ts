export interface StatisticsSummary {
  totalUsers: number
  totalDrawings: number
  activeCategories: number
  averageEngagement: number
  userGrowth: number
  drawingGrowth: number
  categoryGrowth: number
  engagementGrowth: number
}

export interface CategoryUsage {
  id: string
  name: string
  count: number
  percentage: number
}

export interface TimeframeData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
  }[]
}
