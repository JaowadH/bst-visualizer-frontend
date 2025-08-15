import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { createTree } from '../services/api'
import type { TreeResponse } from '../types'

export default function ProcessNumbers() {
  const [params] = useSearchParams()
  const [data, setData] = useState<TreeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const numbers = useMemo(
    () => (params.get('numbers') || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number),
    [params]
  )
  const balanced = (params.get('balanced') || 'false') === 'true'

  useEffect(() => {
    (async () => {
      try {
        const res = await createTree(numbers, balanced)
        setData(res)
      } catch (e: any) {
        setError(e?.message || 'Failed to create tree')
      }
    })()
  }, [numbers.join(','), balanced])

  return (
    <section>
      <h2>Processing</h2>
      <p>Input numbers: <code>{numbers.join(', ')}</code> | Balanced: <strong>{String(balanced)}</strong></p>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!error && !data && <p>Building tree…</p>}
      {data && (
        <>
          <h3>Result</h3>
          <pre style={{ background:'#111', color:'#0f0', padding:12, borderRadius:8, overflow:'auto' }}>
{JSON.stringify(data, null, 2)}
          </pre>
          <p><Link to="/previous-trees">See previous trees →</Link></p>
        </>
      )}
    </section>
  )
}