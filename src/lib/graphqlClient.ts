import { GET_RECENT_NFTS } from "@/queries/getRecentlyListedNfts.gql";
import { NFTQueryResponse } from "@/types/nft";

export async function fetchNFTs(): Promise<NFTQueryResponse> {
  // TODO - Implement the actual GraphQL query to fetch NFTs
  // TODO envvariables for API endpoint
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_RECENT_NFTS }),
  })
  
  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new Error(`GraphQL fetch failed (${response.status}): ${text || response.statusText}`)
  }

  const nfts = await response.json() as Promise<NFTQueryResponse>
  console.log("GraphQL fetch successful NFTs: ", nfts)
  return nfts
}