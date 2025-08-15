export type TreeResponse = {
  id: string
  numbers: number[]
  bst: unknown
  balancedBst: unknown | null
  createdAt: string
}

export type TreeSummary = {
  id: string
  numbers: string
  createdAt: string
}

export type ListResponse = {
  items: TreeSummary[]
  total: number
}