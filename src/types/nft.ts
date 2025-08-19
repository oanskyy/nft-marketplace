export interface NFTItem {
  rindexerId: number
  seller: string
  nftAddress: string
  tokenId: string
  price: string
  blockNumber: number
  txHash: string
  contractAddress: string
}

export interface BoughtCanceledItem {
  nftAddress: string
  tokenId: string
}

export interface NFTQueryResponse {
  data: {
    allItemListeds: { nodes: NFTItem[] }
    allItemBoughts: { nodes: BoughtCanceledItem[] }
    allItemCanceleds: { nodes: BoughtCanceledItem[] }
  }
}
