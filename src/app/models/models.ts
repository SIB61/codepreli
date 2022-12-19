
export interface Project {
  projectName?: string
  categoryName?: string
  categoryId: number
  description?: string
  startTime: string
  completionTime: string
  totalBudget?: string
  completionPercentage: number
  affiliatedAgencies: AffiliatedAgency[]
  locations: Location[]
}

export interface AffiliatedAgency {
  id: number
  name: string
}

export interface Location {
  latitude: number
  logitude: number
}
