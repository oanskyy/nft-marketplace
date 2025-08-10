export const GET_RECENT_NFTS = `
  query GetRecentlyListedNFTs {
    allItemListeds(
      first: 20
      orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC, LOG_INDEX_DESC]
    ) {
      nodes {
        rindexerId
        seller
        nftAddress
        tokenId
        price
        contractAddress
        blockNumber
        txHash
      }
    }
    allItemBoughts { nodes { nftAddress tokenId } }
    allItemCanceleds { nodes { nftAddress tokenId } }
  }
`
