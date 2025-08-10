export async function graphqlFetch<TData>(query: string, variables?: Record<string, unknown>) {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`GraphQL fetch failed (${res.status}): ${text || res.statusText}`)
  }
  return res.json() as Promise<TData>
}
