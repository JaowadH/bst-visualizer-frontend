// src/services/api.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { createTree } from './api'

// Turn axios into a deep mock so post/get are typed as mocks
vi.mock('axios')
const mockedAxios = vi.mocked(axios, { deep: true })

describe('api client', () => {
  beforeEach(() => {
    mockedAxios.post.mockReset()
  })

  it('POST /trees with numbers and balanced', async () => {
    const fake = {
      id: 'x',
      numbers: [1],
      bst: {},
      balancedBst: null,
      createdAt: new Date().toISOString(),
    }
    mockedAxios.post.mockResolvedValueOnce({ data: fake })

    const res = await createTree([1], true)

    expect(mockedAxios.post).toHaveBeenCalled()
    expect(res.id).toBe('x')
  })
})
