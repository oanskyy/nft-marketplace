import { graphqlFetch } from "@/lib/graphqlClient"
import { useQuery } from "@tanstack/react-query"
import { GET_RECENT_NFTS } from "../queries/getRecentlyListedNfts.gql"
import type { NFTData, NFTQueryResponse } from "../types/rindexer"

const MAX_ITEMS = 100

export function useRecentlyListedNFTs() {
  return useQuery<NFTQueryResponse, Error, NFTData[]>({
    queryKey: ["recentNFTs"],
    queryFn: () => graphqlFetch<NFTQueryResponse>(GET_RECENT_NFTS),
    staleTime: 5_000,
    refetchInterval: 10_000,
    gcTime: 5 * 60 * 1000,
    select: (raw) => {
      const bought = new Set<string>()
      const canceled = new Set<string>()

      for (const it of raw.data.allItemBoughts.nodes) {
        if (it.nftAddress && it.tokenId) {
          bought.add(`${it.nftAddress.toLowerCase()}-${it.tokenId}`)
        }
      }
      for (const it of raw.data.allItemCanceleds.nodes) {
        if (it.nftAddress && it.tokenId) {
          canceled.add(`${it.nftAddress.toLowerCase()}-${it.tokenId}`)
        }
      }

      const available = raw.data.allItemListeds.nodes.filter((it) => {
        if (!it.nftAddress || !it.tokenId) return false
        const key = `${it.nftAddress.toLowerCase()}-${it.tokenId}`
        return !bought.has(key) && !canceled.has(key)
      })

      return available.slice(0, MAX_ITEMS).map<NFTData>((nft) => ({
        tokenId: nft.tokenId,
        contractAddress: nft.nftAddress,
        price: nft.price,
      }))
    },
  })
}
