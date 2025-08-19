import Link from "next/link"
import { useRecentlyListedNFTs } from "../hooks/useRecentlyListedNFTs"
import NFTBox from "./NFTBox"

export default function RecentlyListedNFTs() {
  const { isLoading, error, nftDataList } = useRecentlyListedNFTs()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-8 text-center">
        <Link
          href="/list-nft"
          className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          List Your NFT
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {nftDataList?.map((nft) => (
          <Link
            key={`${nft.contractAddress}-${nft.tokenId}`}
            href={`/buy-nft/${nft.contractAddress}/${nft.tokenId}`}
            className="block transform transition hover:scale-105"
          >
            <NFTBox
              tokenId={nft.tokenId}
              contractAddress={nft.contractAddress}
              price={nft.price}
            />
          </Link>
        ))}
      </div>

      {(nftDataList?.length ?? 0) === 0 && (
        <p className="text-center text-gray-500 my-12">No NFTs currently listed</p>
      )}
    </div>
  )
}
