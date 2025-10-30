import { useState, useMemo, memo } from "react"

interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  color: string
  ranks: {
    week1?: number
    week2?: number
    week3?: number
    week4?: number
    week5?: number
  }
}

const cryptos: CryptoData[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    color: "#f7931a",
    ranks: { week1: 1, week2: 1, week3: 1, week4: 1, week5: 1 },
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    color: "#627eea",
    ranks: { week1: 2, week2: 2, week3: 2, week4: 2, week5: 2 },
  },
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
    color: "#26a17b",
    ranks: { week1: 3, week2: 3, week3: 3, week4: 3, week5: 3 },
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    color: "#f3ba2f",
    ranks: { week1: 4, week2: 4, week3: 4, week4: 5, week5: 6 },
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png",
    color: "#14f195",
    ranks: { week1: 5, week2: 5, week3: 5, week4: 4, week5: 4 },
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    color: "#23292f",
    ranks: { week1: 6, week2: 6, week3: 6, week4: 6, week5: 5 },
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USDC",
    image: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png",
    color: "#2775ca",
    ranks: { week1: 7, week2: 7, week3: 7, week4: 7, week5: 7 },
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    image: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png",
    color: "#0033ad",
    ranks: { week1: 8, week2: 8, week3: 9, week4: 10, week5: 11 },
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png",
    color: "#c2a633",
    ranks: { week1: 9, week2: 9, week3: 8, week4: 8, week5: 8 },
  },
  {
    id: "tron",
    symbol: "TRX",
    name: "TRON",
    image: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png",
    color: "#eb0029",
    ranks: { week1: 10, week2: 10, week3: 10, week4: 9, week5: 9 },
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    image: "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    color: "#e84142",
    ranks: { week1: 11, week2: 11, week3: 11, week4: 11, week5: 10 },
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    image: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    color: "#375bd2",
    ranks: { week1: 12, week2: 12, week3: 12, week4: 13, week5: 14 },
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    image: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png",
    color: "#e6007a",
    ranks: { week1: 13, week2: 13, week3: 14, week4: 15, week5: 18 },
  },
  {
    id: "polygon",
    symbol: "MATIC",
    name: "Polygon",
    image: "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png",
    color: "#8247e5",
    ranks: { week1: 14, week2: 15, week3: 15, week4: 17 },
  },
  {
    id: "litecoin",
    symbol: "LTC",
    name: "Litecoin",
    image: "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png",
    color: "#345d9d",
    ranks: { week1: 15, week2: 14, week3: 13, week4: 12, week5: 12 },
  },
  {
    id: "shiba-inu",
    symbol: "SHIB",
    name: "Shiba Inu",
    image: "https://coin-images.coingecko.com/coins/images/11939/large/shiba.png",
    color: "#ffa409",
    ranks: { week2: 16, week3: 16, week4: 14, week5: 13 },
  },
  {
    id: "sui",
    symbol: "SUI",
    name: "Sui",
    image: "https://coin-images.coingecko.com/coins/images/26375/large/sui_asset.jpeg",
    color: "#4da2ff",
    ranks: { week4: 16, week5: 15 },
  },
  {
    id: "bitcoin-cash",
    symbol: "BCH",
    name: "Bitcoin Cash",
    image: "https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png",
    color: "#8dc351",
    ranks: { week1: 16, week2: 17, week3: 17, week4: 18, week5: 16 },
  },
  {
    id: "stellar",
    symbol: "XLM",
    name: "Stellar",
    image: "https://coin-images.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png",
    color: "#14b6e7",
    ranks: { week1: 17, week2: 18, week3: 18, week4: 19, week5: 17 },
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    image: "https://coin-images.coingecko.com/coins/images/12504/large/uniswap-uni.png",
    color: "#ff007a",
    ranks: { week1: 18, week2: 19, week3: 19, week4: 20, week5: 19 },
  },
  {
    id: "cosmos",
    symbol: "ATOM",
    name: "Cosmos",
    image: "https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png",
    color: "#2e3148",
    ranks: { week1: 19, week2: 20, week3: 20, week4: 21, week5: 20 },
  },
  {
    id: "monero",
    symbol: "XMR",
    name: "Monero",
    image: "https://coin-images.coingecko.com/coins/images/69/large/monero_logo.png",
    color: "#ff6600",
    ranks: { week1: 20, week2: 21, week3: 21, week4: 22, week5: 21 },
  },
  {
    id: "ethereum-classic",
    symbol: "ETC",
    name: "Ethereum Classic",
    image: "https://coin-images.coingecko.com/coins/images/453/large/ethereum-classic-logo.png",
    color: "#328332",
    ranks: { week1: 21, week2: 22, week3: 22, week4: 23, week5: 22 },
  },
  {
    id: "okb",
    symbol: "OKB",
    name: "OKB",
    image: "https://coin-images.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png",
    color: "#2c3a59",
    ranks: { week1: 22, week2: 23, week3: 23, week4: 24, week5: 23 },
  },
  {
    id: "filecoin",
    symbol: "FIL",
    name: "Filecoin",
    image: "https://coin-images.coingecko.com/coins/images/12817/large/filecoin.png",
    color: "#0090ff",
    ranks: { week1: 23, week2: 24, week3: 24, week4: 25, week5: 24 },
  },
  {
    id: "hedera",
    symbol: "HBAR",
    name: "Hedera",
    image: "https://coin-images.coingecko.com/coins/images/3688/large/hbar.png",
    color: "#1a1a1a",
    ranks: { week1: 24, week2: 25, week3: 25, week4: 26, week5: 25 },
  },
  {
    id: "aptos",
    symbol: "APT",
    name: "Aptos",
    image: "https://coin-images.coingecko.com/coins/images/26455/large/aptos_round.png",
    color: "#00d4aa",
    ranks: { week1: 25, week2: 26, week3: 26, week4: 27, week5: 26 },
  },
  {
    id: "vechain",
    symbol: "VET",
    name: "VeChain",
    image: "https://coin-images.coingecko.com/coins/images/1167/large/VeChain-Logo-768x725.png",
    color: "#15bdff",
    ranks: { week1: 26, week2: 27, week3: 27, week4: 28, week5: 27 },
  },
  {
    id: "near",
    symbol: "NEAR",
    name: "NEAR Protocol",
    image: "https://coin-images.coingecko.com/coins/images/10365/large/near.jpg",
    color: "#2e2e2e",
    ranks: { week1: 27, week2: 28, week3: 28, week4: 29, week5: 28 },
  },
  {
    id: "algorand",
    symbol: "ALGO",
    name: "Algorand",
    image: "https://coin-images.coingecko.com/coins/images/4380/large/download.png",
    color: "#1a1a1a",
    ranks: { week1: 28, week2: 29, week3: 29, week4: 30, week5: 29 },
  },
  {
    id: "internet-computer",
    symbol: "ICP",
    name: "Internet Computer",
    image: "https://coin-images.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png",
    color: "#29abe2",
    ranks: { week1: 29, week2: 30, week3: 30, week4: 31, week5: 30 },
  },
  {
    id: "quant",
    symbol: "QNT",
    name: "Quant",
    image: "https://coin-images.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg",
    color: "#2e2e2e",
    ranks: { week1: 30, week2: 35, week3: 28, week4: 42, week5: 31 },
  },
  {
    id: "optimism",
    symbol: "OP",
    name: "Optimism",
    image: "https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png",
    color: "#ff0420",
    ranks: { week1: 31, week2: 31, week3: 38, week4: 33, week5: 45 },
  },
  {
    id: "arbitrum",
    symbol: "ARB",
    name: "Arbitrum",
    image: "https://coin-images.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg",
    color: "#28a0f0",
    ranks: { week1: 32, week2: 33, week3: 31, week4: 34, week5: 32 },
  },
  {
    id: "aave",
    symbol: "AAVE",
    name: "Aave",
    image: "https://coin-images.coingecko.com/coins/images/12645/large/AAVE.png",
    color: "#b6509e",
    ranks: { week1: 33, week2: 42, week3: 35, week4: 29, week5: 38 },
  },
  {
    id: "the-graph",
    symbol: "GRT",
    name: "The Graph",
    image: "https://coin-images.coingecko.com/coins/images/13397/large/Graph_Token.png",
    color: "#6747ed",
    ranks: { week1: 34, week2: 34, week3: 41, week4: 36, week5: 33 },
  },
  {
    id: "stacks",
    symbol: "STX",
    name: "Stacks",
    image: "https://coin-images.coingecko.com/coins/images/2069/large/Stacks_logo_full.png",
    color: "#5546ff",
    ranks: { week1: 35, week2: 38, week3: 33, week4: 44, week5: 36 },
  },
  {
    id: "immutable-x",
    symbol: "IMX",
    name: "Immutable",
    image: "https://coin-images.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png",
    color: "#2e2e2e",
    ranks: { week1: 36, week2: 36, week3: 45, week4: 38, week5: 41 },
  },
  {
    id: "injective",
    symbol: "INJ",
    name: "Injective",
    image: "https://coin-images.coingecko.com/coins/images/12882/large/Secondary_Symbol.png",
    color: "#00f2fe",
    ranks: { week1: 37, week2: 45, week3: 37, week4: 32, week5: 34 },
  },
  {
    id: "render",
    symbol: "RNDR",
    name: "Render",
    image: "https://coin-images.coingecko.com/coins/images/11636/large/rndr.png",
    color: "#2e2e2e",
    ranks: { week1: 38, week2: 39, week3: 48, week4: 40, week5: 52 },
  },
  {
    id: "maker",
    symbol: "MKR",
    name: "Maker",
    image: "https://coin-images.coingecko.com/coins/images/1364/large/Mark_Maker.png",
    color: "#1aab9b",
    ranks: { week1: 39, week2: 48, week3: 39, week4: 35, week5: 40 },
  },
  {
    id: "theta",
    symbol: "THETA",
    name: "Theta Network",
    image: "https://coin-images.coingecko.com/coins/images/2538/large/theta-token-logo.png",
    color: "#2ab8e6",
    ranks: { week1: 40, week2: 40, week3: 52, week4: 47, week5: 37 },
  },
  {
    id: "fantom",
    symbol: "FTM",
    name: "Fantom",
    image: "https://coin-images.coingecko.com/coins/images/4001/large/Fantom_round.png",
    color: "#13b5ec",
    ranks: { week1: 41, week2: 51, week3: 42, week4: 39, week5: 48 },
  },
  {
    id: "flow",
    symbol: "FLOW",
    name: "Flow",
    image: "https://coin-images.coingecko.com/coins/images/13446/large/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png",
    color: "#00ef8b",
    ranks: { week1: 42, week2: 43, week3: 36, week4: 51, week5: 43 },
  },
  {
    id: "elrond",
    symbol: "EGLD",
    name: "MultiversX",
    image: "https://coin-images.coingecko.com/coins/images/12335/large/egld-token-logo.png",
    color: "#2e2e2e",
    ranks: { week1: 43, week2: 37, week3: 49, week4: 45, week5: 35 },
  },
  {
    id: "axie-infinity",
    symbol: "AXS",
    name: "Axie Infinity",
    image: "https://coin-images.coingecko.com/coins/images/13029/large/axie_infinity_logo.png",
    color: "#0055d5",
    ranks: { week1: 44, week2: 55, week3: 44, week4: 37, week5: 55 },
  },
  {
    id: "sandbox",
    symbol: "SAND",
    name: "The Sandbox",
    image: "https://coin-images.coingecko.com/coins/images/12129/large/sandbox_logo.jpg",
    color: "#04adef",
    ranks: { week1: 45, week2: 46, week3: 58, week4: 48, week5: 39 },
  },
  {
    id: "decentraland",
    symbol: "MANA",
    name: "Decentraland",
    image: "https://coin-images.coingecko.com/coins/images/878/large/decentraland-mana.png",
    color: "#ff2d55",
    ranks: { week1: 46, week2: 58, week3: 46, week4: 41, week5: 60 },
  },
  {
    id: "tezos",
    symbol: "XTZ",
    name: "Tezos",
    image: "https://coin-images.coingecko.com/coins/images/976/large/Tezos-logo.png",
    color: "#2c7df7",
    ranks: { week1: 47, week2: 47, week3: 61, week4: 49, week5: 44 },
  },
  {
    id: "eos",
    symbol: "EOS",
    name: "EOS",
    image: "https://coin-images.coingecko.com/coins/images/738/large/eos-eos-logo.png",
    color: "#2e2e2e",
    ranks: { week1: 48, week2: 62, week3: 48, week4: 56, week5: 49 },
  },
  {
    id: "kucoin-token",
    symbol: "KCS",
    name: "KuCoin",
    image: "https://coin-images.coingecko.com/coins/images/1047/large/sa9z79.png",
    color: "#23af91",
    ranks: { week1: 49, week2: 49, week3: 54, week4: 50, week5: 62 },
  },
  {
    id: "neo",
    symbol: "NEO",
    name: "NEO",
    image: "https://coin-images.coingecko.com/coins/images/480/large/NEO_512_512.png",
    color: "#58bf00",
    ranks: { week1: 50, week2: 65, week3: 50, week4: 43, week5: 51 },
  },
  {
    id: "iota",
    symbol: "IOTA",
    name: "IOTA",
    image: "https://coin-images.coingecko.com/coins/images/692/large/IOTA_Swirl.png",
    color: "#2e2e2e",
    ranks: { week1: 51, week2: 52, week3: 67, week4: 53, week5: 46 },
  },
  {
    id: "klaytn",
    symbol: "KLAY",
    name: "Klaytn",
    image: "https://coin-images.coingecko.com/coins/images/9672/large/klaytn.png",
    color: "#2e2e2e",
    ranks: { week1: 52, week2: 44, week3: 52, week4: 68, week5: 53 },
  },
  {
    id: "bitdao",
    symbol: "BIT",
    name: "BitDAO",
    image: "https://coin-images.coingecko.com/coins/images/17627/large/rI_YptK8.png",
    color: "#2e2e2e",
    ranks: { week1: 53, week2: 53, week3: 43, week4: 55, week5: 71 },
  },
  {
    id: "gala",
    symbol: "GALA",
    name: "Gala",
    image: "https://coin-images.coingecko.com/coins/images/12493/large/GALA-COINGECKO.png",
    color: "#2e2e2e",
    ranks: { week1: 54, week2: 71, week3: 55, week4: 46, week5: 55 },
  },
  {
    id: "chiliz",
    symbol: "CHZ",
    name: "Chiliz",
    image: "https://coin-images.coingecko.com/coins/images/8834/large/Chiliz.png",
    color: "#cd0124",
    ranks: { week1: 55, week2: 56, week3: 72, week4: 57, week5: 42 },
  },
  {
    id: "enjin",
    symbol: "ENJ",
    name: "Enjin Coin",
    image: "https://coin-images.coingecko.com/coins/images/1102/large/enjin-coin-logo.png",
    color: "#7866d5",
    ranks: { week1: 56, week2: 68, week3: 56, week4: 62, week5: 57 },
  },
  {
    id: "curve-dao",
    symbol: "CRV",
    name: "Curve DAO",
    image: "https://coin-images.coingecko.com/coins/images/12124/large/Curve.png",
    color: "#40649f",
    ranks: { week1: 57, week2: 57, week3: 47, week4: 59, week5: 74 },
  },
  {
    id: "pancakeswap",
    symbol: "CAKE",
    name: "PancakeSwap",
    image: "https://coin-images.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo.png",
    color: "#d1884f",
    ranks: { week1: 58, week2: 74, week3: 59, week4: 52, week5: 58 },
  },
  {
    id: "zilliqa",
    symbol: "ZIL",
    name: "Zilliqa",
    image: "https://coin-images.coingecko.com/coins/images/2687/large/Zilliqa-logo.png",
    color: "#49c1bf",
    ranks: { week1: 59, week2: 59, week3: 76, week4: 61, week5: 47 },
  },
  {
    id: "compound",
    symbol: "COMP",
    name: "Compound",
    image: "https://coin-images.coingecko.com/coins/images/10775/large/COMP.png",
    color: "#00d395",
    ranks: { week1: 60, week2: 78, week3: 60, week4: 54, week5: 68 },
  },
  {
    id: "thorchain",
    symbol: "RUNE",
    name: "THORChain",
    image: "https://coin-images.coingecko.com/coins/images/6595/large/thorchain.png",
    color: "#33ff99",
    ranks: { week1: 61, week2: 61, week3: 51, week4: 73, week5: 61 },
  },
  {
    id: "mina",
    symbol: "MINA",
    name: "Mina Protocol",
    image: "https://coin-images.coingecko.com/coins/images/15628/large/JM4_vQ34_400x400.png",
    color: "#2e2e2e",
    ranks: { week1: 62, week2: 50, week3: 68, week4: 64, week5: 50 },
  },
  {
    id: "dash",
    symbol: "DASH",
    name: "Dash",
    image: "https://coin-images.coingecko.com/coins/images/19/large/dash-logo.png",
    color: "#008ce7",
    ranks: { week1: 63, week2: 63, week3: 63, week4: 78, week5: 64 },
  },
  {
    id: "zcash",
    symbol: "ZEC",
    name: "Zcash",
    image: "https://coin-images.coingecko.com/coins/images/486/large/circle-zcash-color.png",
    color: "#ecb244",
    ranks: { week1: 64, week2: 82, week3: 64, week4: 58, week5: 80 },
  },
  {
    id: "basic-attention",
    symbol: "BAT",
    name: "Basic Attention",
    image: "https://coin-images.coingecko.com/coins/images/677/large/basic-attention-token.png",
    color: "#ff5000",
    ranks: { week1: 65, week2: 66, week3: 81, week4: 67, week5: 56 },
  },
  {
    id: "synthetix",
    symbol: "SNX",
    name: "Synthetix",
    image: "https://coin-images.coingecko.com/coins/images/3406/large/SNX.png",
    color: "#00d1ff",
    ranks: { week1: 66, week2: 54, week3: 66, week4: 82, week5: 67 },
  },
  {
    id: "1inch",
    symbol: "1INCH",
    name: "1inch",
    image: "https://coin-images.coingecko.com/coins/images/13469/large/1inch-token.png",
    color: "#94a6c3",
    ranks: { week1: 67, week2: 67, week3: 53, week4: 69, week5: 85 },
  },
  {
    id: "sushi",
    symbol: "SUSHI",
    name: "Sushi",
    image: "https://coin-images.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png",
    color: "#fa52a0",
    ranks: { week1: 68, week2: 85, week3: 69, week4: 60, week5: 69 },
  },
  {
    id: "loopring",
    symbol: "LRC",
    name: "Loopring",
    image: "https://coin-images.coingecko.com/coins/images/913/large/LRC.png",
    color: "#1c60ff",
    ranks: { week1: 69, week2: 69, week3: 84, week4: 71, week5: 54 },
  },
  {
    id: "qtum",
    symbol: "QTUM",
    name: "Qtum",
    image: "https://coin-images.coingecko.com/coins/images/684/large/Qtum_Logo_blue_CG.png",
    color: "#2e9ad0",
    ranks: { week1: 70, week2: 60, week3: 70, week4: 88, week5: 70 },
  },
  {
    id: "waves",
    symbol: "WAVES",
    name: "Waves",
    image: "https://coin-images.coingecko.com/coins/images/425/large/waves.png",
    color: "#0155ff",
    ranks: { week1: 71, week2: 72, week3: 57, week4: 72, week5: 91 },
  },
  {
    id: "harmony",
    symbol: "ONE",
    name: "Harmony",
    image: "https://coin-images.coingecko.com/coins/images/4344/large/Y88JAze.png",
    color: "#00aee9",
    ranks: { week1: 72, week2: 91, week3: 73, week4: 63, week5: 73 },
  },
  {
    id: "ravencoin",
    symbol: "RVN",
    name: "Ravencoin",
    image: "https://coin-images.coingecko.com/coins/images/3412/large/ravencoin.png",
    color: "#384182",
    ranks: { week1: 73, week2: 73, week3: 89, week4: 75, week5: 59 },
  },
  {
    id: "icon",
    symbol: "ICX",
    name: "ICON",
    image: "https://coin-images.coingecko.com/coins/images/1060/large/icon-icx-logo.png",
    color: "#1fc5c9",
    ranks: { week1: 74, week2: 64, week3: 74, week4: 91, week5: 75 },
  },
  {
    id: "ontology",
    symbol: "ONT",
    name: "Ontology",
    image: "https://coin-images.coingecko.com/coins/images/3447/large/ONT.png",
    color: "#32a4be",
    ranks: { week1: 75, week2: 75, week3: 62, week4: 77, week5: 94 },
  },
  {
    id: "celo",
    symbol: "CELO",
    name: "Celo",
    image: "https://coin-images.coingecko.com/coins/images/11090/large/InjXBNx9_400x400.jpg",
    color: "#35d07f",
    ranks: { week1: 76, week2: 94, week3: 76, week4: 66, week5: 76 },
  },
  {
    id: "helium",
    symbol: "HNT",
    name: "Helium",
    image: "https://coin-images.coingecko.com/coins/images/4284/large/Helium_HNT.png",
    color: "#474dff",
    ranks: { week1: 77, week2: 77, week3: 93, week4: 79, week5: 63 },
  },
  {
    id: "arweave",
    symbol: "AR",
    name: "Arweave",
    image: "https://coin-images.coingecko.com/coins/images/4343/large/oRt6SiEN_400x400.jpg",
    color: "#2e2e2e",
    ranks: { week1: 78, week2: 70, week3: 78, week4: 95, week5: 78 },
  },
  {
    id: "kusama",
    symbol: "KSM",
    name: "Kusama",
    image: "https://coin-images.coingecko.com/coins/images/9568/large/m4zRhP5e_400x400.jpg",
    color: "#2e2e2e",
    ranks: { week1: 79, week2: 79, week3: 65, week4: 81, week5: 97 },
  },
  {
    id: "nervos",
    symbol: "CKB",
    name: "Nervos Network",
    image: "https://coin-images.coingecko.com/coins/images/9566/large/Nervos_White.png",
    color: "#3cc68a",
    ranks: { week1: 80, week2: 97, week3: 80, week4: 70, week5: 81 },
  },
  {
    id: "ankr",
    symbol: "ANKR",
    name: "Ankr",
    image: "https://coin-images.coingecko.com/coins/images/4324/large/U85xTl2.png",
    color: "#2e6bf6",
    ranks: { week1: 81, week2: 81, week3: 96, week4: 83, week5: 65 },
  },
  {
    id: "fetch-ai",
    symbol: "FET",
    name: "Fetch.ai",
    image: "https://coin-images.coingecko.com/coins/images/5681/large/Fetch.jpg",
    color: "#0714fe",
    ranks: { week1: 82, week2: 76, week3: 82, week4: 97, week5: 82 },
  },
  {
    id: "ocean-protocol",
    symbol: "OCEAN",
    name: "Ocean Protocol",
    image: "https://coin-images.coingecko.com/coins/images/3687/large/ocean-protocol-logo.jpg",
    color: "#2e2e2e",
    ranks: { week1: 83, week2: 83, week3: 71, week4: 84, week5: 99 },
  },
  {
    id: "band-protocol",
    symbol: "BAND",
    name: "Band Protocol",
    image: "https://coin-images.coingecko.com/coins/images/9545/large/Band_token_blue_violet_token.png",
    color: "#516aff",
    ranks: { week1: 84, week2: 99, week3: 85, week4: 74, week5: 84 },
  },
  {
    id: "ren",
    symbol: "REN",
    name: "Ren",
    image: "https://coin-images.coingecko.com/coins/images/3139/large/REN.png",
    color: "#080817",
    ranks: { week1: 85, week2: 84, week3: 99, week4: 86, week5: 66 },
  },
  {
    id: "storj",
    symbol: "STORJ",
    name: "Storj",
    image: "https://coin-images.coingecko.com/coins/images/949/large/storj.png",
    color: "#2683ff",
    ranks: { week1: 86, week2: 66, week3: 86, week4: 100, week5: 86 },
  },
  {
    id: "numeraire",
    symbol: "NMR",
    name: "Numeraire",
    image: "https://coin-images.coingecko.com/coins/images/752/large/numeraire.png",
    color: "#2e2e2e",
    ranks: { week1: 87, week2: 87, week3: 75, week4: 87, week5: 100 },
  },
  {
    id: "civic",
    symbol: "CVC",
    name: "Civic",
    image: "https://coin-images.coingecko.com/coins/images/788/large/civic.png",
    color: "#3ab03e",
    ranks: { week1: 88, week2: 100, week3: 88, week4: 76, week5: 88 },
  },
  {
    id: "status",
    symbol: "SNT",
    name: "Status",
    image: "https://coin-images.coingecko.com/coins/images/779/large/status.png",
    color: "#5b6dee",
    ranks: { week1: 89, week2: 88, week3: 100, week4: 90, week5: 72 },
  },
  {
    id: "golem",
    symbol: "GLM",
    name: "Golem",
    image: "https://coin-images.coingecko.com/coins/images/542/large/Golem_Submark_Positive_RGB.png",
    color: "#0b0b0b",
    ranks: { week1: 90, week2: 80, week3: 90, week4: 98, week5: 90 },
  },
  {
    id: "augur",
    symbol: "REP",
    name: "Augur",
    image: "https://coin-images.coingecko.com/coins/images/309/large/REP.png",
    color: "#412468",
    ranks: { week1: 91, week2: 90, week3: 79, week4: 92, week5: 96 },
  },
  {
    id: "lisk",
    symbol: "LSK",
    name: "Lisk",
    image: "https://coin-images.coingecko.com/coins/images/385/large/Lisk_Symbol_-_Blue.png",
    color: "#0d4ea0",
    ranks: { week1: 92, week2: 92, week3: 91, week4: 80, week5: 92 },
  },
  {
    id: "decred",
    symbol: "DCR",
    name: "Decred",
    image: "https://coin-images.coingecko.com/coins/images/329/large/decred.png",
    color: "#2ed6a1",
    ranks: { week1: 93, week2: 86, week3: 94, week4: 93, week5: 77 },
  },
  {
    id: "nano",
    symbol: "NANO",
    name: "Nano",
    image: "https://coin-images.coingecko.com/coins/images/756/large/nano.png",
    color: "#4a90e2",
    ranks: { week1: 94, week2: 93, week3: 87, week4: 96, week5: 93 },
  },
  {
    id: "digibyte",
    symbol: "DGB",
    name: "DigiByte",
    image: "https://coin-images.coingecko.com/coins/images/63/large/digibyte.png",
    color: "#006ad2",
    ranks: { week1: 95, week2: 95, week3: 95, week4: 85, week5: 95 },
  },
  {
    id: "siacoin",
    symbol: "SC",
    name: "Siacoin",
    image: "https://coin-images.coingecko.com/coins/images/289/large/siacoin.png",
    color: "#00cba0",
    ranks: { week1: 96, week2: 89, week3: 97, week4: 94, week5: 79 },
  },
  {
    id: "verge",
    symbol: "XVG",
    name: "Verge",
    image: "https://coin-images.coingecko.com/coins/images/200/large/verge-symbol-color.png",
    color: "#00cbff",
    ranks: { week1: 97, week2: 96, week3: 92, week4: 99, week5: 98 },
  },
  {
    id: "holo",
    symbol: "HOT",
    name: "Holo",
    image: "https://coin-images.coingecko.com/coins/images/3348/large/Holologo_Profile.png",
    color: "#7c7c7c",
    ranks: { week1: 98, week2: 98, week3: 98, week4: 89, week5: 89 },
  },
  {
    id: "wax",
    symbol: "WAXP",
    name: "WAX",
    image: "https://coin-images.coingecko.com/coins/images/1372/large/WAX_Coin_Tickers_P_512px.png",
    color: "#f89022",
    ranks: { week1: 99, week2: 41, week3: 40 },
  },
  {
    id: "pepe",
    symbol: "PEPE",
    name: "Pepe",
    image: "https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg",
    color: "#3d9f3d",
    ranks: { week3: 32, week4: 65, week5: 87 },
  },
  {
    id: "apecoin",
    symbol: "APE",
    name: "ApeCoin",
    image: "https://coin-images.coingecko.com/coins/images/24383/large/apecoin.jpg",
    color: "#0052ff",
    ranks: { week1: 100, week2: 32, week3: 34, week4: 96, week5: 83 },
  },
]

const weeks = ["week1", "week2", "week3", "week4", "week5"] as const
const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]

const CryptoPath = memo(
  ({
    crypto,
    width,
    height,
    isHovered,
    isOtherHovered,
    onMouseEnter,
    onMouseLeave,
  }: {
    crypto: CryptoData
    width: number
    height: number
    isHovered: boolean
    isOtherHovered: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
  }) => {
    const getYPosition = (rank: number, totalRanks: number, height: number) => {
      const spacing = height / (totalRanks + 1)
      return spacing * rank
    }

    const createPath = (crypto: CryptoData, width: number, height: number) => {
      const points: Array<{ x: number; y: number; exists: boolean }> = []

      weeks.forEach((week, index) => {
        const x = (width / (weeks.length - 1)) * index
        const rank = crypto.ranks[week]

        if (rank !== undefined) {
          const y = getYPosition(rank, 100, height)
          points.push({ x, y, exists: true })
        } else {
          points.push({ x, y: 0, exists: false })
        }
      })

      const firstExistingIndex = points.findIndex((p) => p.exists)
      const lastExistingIndex = points.map((p) => p.exists).lastIndexOf(true)

      if (firstExistingIndex === -1) return ""

      let path = `M ${points[firstExistingIndex].x} ${points[firstExistingIndex].y}`

      for (let i = firstExistingIndex; i < lastExistingIndex; i++) {
        const current = points[i]
        const next = points[i + 1]

        if (current.exists && next.exists) {
          const controlPointX = (current.x + next.x) / 2
          path += ` C ${controlPointX} ${current.y}, ${controlPointX} ${next.y}, ${next.x} ${next.y}`
        }
      }

      return path
    }

    const path = useMemo(() => createPath(crypto, width, height), [crypto, width, height])

    return (
      <g>
        {isHovered && (
          <path
            d={path}
            transform="translate(150, 20)"
            fill="none"
            stroke={crypto.color}
            strokeWidth="12"
            opacity="0.3"
            filter="blur(8px)"
            pointerEvents="none"
          />
        )}

        <path
          d={path}
          transform="translate(150, 20)"
          fill="none"
          stroke={crypto.color}
          strokeWidth={isHovered ? "6" : "3"}
          opacity={isOtherHovered ? 0.15 : isHovered ? 1 : 0.7}
          className="transition-all duration-200 cursor-pointer"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            filter: isHovered ? "brightness(1.2)" : "none",
          }}
        />

        {weeks.map((week, weekIndex) => {
          const rank = crypto.ranks[week]

          if (rank === undefined) return null

          const x = 150 + ((1200 - 300) / (weeks.length - 1)) * weekIndex
          const y = 20 + getYPosition(rank, 100, height)

          const allWeeks = Object.keys(crypto.ranks)
          const firstWeek = allWeeks[0]
          const lastWeek = allWeeks[allWeeks.length - 1]
          const isFirstAppearance = week === firstWeek
          const isLastAppearance = week === lastWeek

          return (
            <g
              key={`${crypto.id}-${week}`}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="cursor-pointer"
            >
              <circle
                cx={x}
                cy={y}
                r={isHovered ? "14" : "10"}
                fill="#1e293b"
                opacity={isOtherHovered ? 0.3 : 1}
                className="transition-all duration-200"
              />

              <circle
                cx={x}
                cy={y}
                r={isHovered ? "12" : "8"}
                fill={crypto.color}
                opacity={isOtherHovered ? 0.2 : 1}
                className="transition-all duration-200"
              />

              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={isHovered ? "11" : "9"}
                fontWeight="700"
                opacity={isOtherHovered ? 0.3 : 1}
                className="transition-all duration-200"
              >
                {rank}
              </text>

              {isFirstAppearance && (
                <>
                  <rect
                    x={x - 130}
                    y={y - 14}
                    width="110"
                    height="28"
                    rx="6"
                    fill={crypto.color}
                    opacity={isOtherHovered ? 0.2 : isHovered ? 1 : 0.9}
                    className="transition-all duration-200"
                  />
                  <image
                    href={crypto.image}
                    x={x - 120}
                    y={y - 9}
                    width="18"
                    height="18"
                    opacity={isOtherHovered ? 0.3 : 1}
                    className="transition-opacity duration-200"
                  />
                  <text
                    x={x - 60}
                    y={y + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="700"
                    opacity={isOtherHovered ? 0.3 : 1}
                    className="transition-opacity duration-200"
                  >
                    {crypto.symbol}
                  </text>
                </>
              )}

              {isLastAppearance && (
                <>
                  <rect
                    x={x + 20}
                    y={y - 14}
                    width="110"
                    height="28"
                    rx="6"
                    fill={crypto.color}
                    opacity={isOtherHovered ? 0.2 : isHovered ? 1 : 0.9}
                    className="transition-all duration-200"
                  />
                  <image
                    href={crypto.image}
                    x={x + 30}
                    y={y - 9}
                    width="18"
                    height="18"
                    opacity={isOtherHovered ? 0.3 : 1}
                    className="transition-opacity duration-200"
                  />
                  <text
                    x={x + 85}
                    y={y + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="700"
                    opacity={isOtherHovered ? 0.3 : 1}
                    className="transition-opacity duration-200"
                  >
                    {crypto.symbol}
                  </text>
                </>
              )}
            </g>
          )
        })}
      </g>
    )
  },
)

CryptoPath.displayName = "CryptoPath"

export default function EconomicChart() {
  const [hoveredCrypto, setHoveredCrypto] = useState<string | null>(null)

  const svgHeight = 3600
  const svgWidth = 1200

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Decorative border */}
      <div className="border-4 border-amber-600/50 rounded-lg p-8 relative mb-8">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 -m-1" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-400 -m-1" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-400 -m-1" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 -m-1" />

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm tracking-widest text-amber-300/70 mb-2 font-sans uppercase">
            Crypto Market Trajectories:
          </h2>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight text-amber-50">
            TOP 100
            <br />
            CRYPTOCURRENCIES
            <br />
            BY MARKET CAP
            <br />
            WEEKLY RANKINGS
          </h1>
          <p className="text-base text-amber-100/70 max-w-2xl mx-auto mb-4">
            Track how the top cryptocurrencies shift positions in the market cap rankings
            <br />
            over the past five weeks. Hover over any crypto to see its trajectory.
          </p>
          <div className="inline-block border border-amber-600/50 px-6 py-2 text-sm text-amber-100/80">
            Ranking based on market capitalization (USD)
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 rounded-lg border-4 border-amber-600/20 shadow-2xl overflow-hidden">
        <div className="relative w-full overflow-x-auto">
          <svg
            width="100%"
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            className="overflow-visible"
          >
            {weeks.map((week, index) => {
              const x = 150 + ((svgWidth - 300) / (weeks.length - 1)) * index
              return (
                <g key={week}>
                  <line x1={x} y1={20} x2={x} y2={svgHeight - 20} stroke="#334155" strokeWidth="2" />
                  <text x={x} y={15} textAnchor="middle" fill="#cbd5e1" fontSize="20" fontWeight="700">
                    {weekLabels[index]}
                  </text>
                </g>
              )
            })}

            {cryptos.map((crypto) => {
              const isHovered = hoveredCrypto === crypto.id
              const isOtherHovered = hoveredCrypto && hoveredCrypto !== crypto.id

              return (
                <CryptoPath
                  key={crypto.id}
                  crypto={crypto}
                  width={svgWidth - 300}
                  height={svgHeight - 40}
                  isHovered={isHovered}
                  isOtherHovered={!!isOtherHovered}
                  onMouseEnter={() => setHoveredCrypto(crypto.id)}
                  onMouseLeave={() => setHoveredCrypto(null)}
                />
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}
