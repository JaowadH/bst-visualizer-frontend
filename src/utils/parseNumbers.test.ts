import { describe, it, expect } from 'vitest'
import { parseNumbers } from './parseNumbers'

describe('parseNumbers', () => {
  it('parses comma/space separated integers', () => {
    expect(parseNumbers('8, 3 10,1 6')).toEqual([8,3,10,1,6])
  })
  it('filters non-numeric tokens', () => {
    expect(parseNumbers('1, x, 2')).toEqual([1,2])
  })
})