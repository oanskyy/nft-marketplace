import { fetchNFTs } from "@/lib/graphqlClient"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import type { NFTQueryResponse } from "../types/nft"

// Custom hook for fetching and processing NFT data
export function useRecentlyListedNFTs() {
    const { data, isLoading, error } = useQuery<NFTQueryResponse>({
        queryKey: ["recentNFTs"],
        queryFn: fetchNFTs,
    })

    // Use useMemo to avoid reprocessing data when it hasn't changed
    const nftDataList = useMemo(() => {
        if (!data) return []

        // Create sets of bought and canceled NFTs for quick lookup
        const boughtNFTs = new Set<string>()
        const canceledNFTs = new Set<string>()

        data.data.allItemBoughts.nodes.forEach(item => {
            if (item.nftAddress && item.tokenId) {
                boughtNFTs.add(`${item.nftAddress}-${item.tokenId}`)
            }
        })

        data.data.allItemCanceleds.nodes.forEach(item => {
            if (item.nftAddress && item.tokenId) {
                canceledNFTs.add(`${item.nftAddress}-${item.tokenId}`)
            }
        })

        // Filter listed NFTs to only include those that haven't been bought or canceled
        const availableNFTs = data.data.allItemListeds.nodes.filter(item => {
            if (!item.nftAddress || !item.tokenId) return false

            const key = `${item.nftAddress}-${item.tokenId}`
            return !boughtNFTs.has(key) && !canceledNFTs.has(key)
        })

        // Get the top 5
        const recentNFTs = availableNFTs.slice(0, 100)

        // Extract the specific data we need
        return recentNFTs.map(nft => ({
            tokenId: nft.tokenId,
            contractAddress: nft.nftAddress,
            price: nft.price,
        }))
    }, [data])

    return { isLoading, error, nftDataList }
}