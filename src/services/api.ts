import axios from 'axios'
import type { ListResponse, TreeResponse } from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL || ''

console.log('API BASE =', BASE);

export async function createTree(numbers: number[], balanced: boolean): Promise<TreeResponse> {
  const { data } = await axios.post(`${BASE}/trees`, { numbers, balanced })
  return data
}

export async function listTrees(offset = 0, limit = 20): Promise<ListResponse> {
  const { data } = await axios.get(`${BASE}/trees`, { params: { offset, limit } })
  return data
}