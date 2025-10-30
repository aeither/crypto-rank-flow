import { useState } from "react";
import { CryptoBar } from "./CryptoBar";
import { ConnectionPath } from "./ConnectionPath";
import { HighlightCard } from "./HighlightCard";
import { cn } from "@/lib/utils";

export interface CryptoRanking {
  id: string;
  name: string;
  symbol: string;
  image: string;
  color: string;
  rankings: number[];
}

const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

const cryptoData: CryptoRanking[] = [
  { 
    id: "bitcoin", 
    name: "Bitcoin", 
    symbol: "BTC", 
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    color: "bitcoin", 
    rankings: [1, 1, 1, 1, 1] 
  },
  { 
    id: "ethereum", 
    name: "Ethereum", 
    symbol: "ETH", 
    image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    color: "ethereum", 
    rankings: [2, 2, 2, 2, 2] 
  },
  { 
    id: "tether", 
    name: "Tether", 
    symbol: "USDT", 
    image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    color: "stablecoin", 
    rankings: [3, 3, 3, 4, 5] 
  },
  { 
    id: "binancecoin", 
    name: "BNB", 
    symbol: "BNB", 
    image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
    color: "bnb", 
    rankings: [4, 4, 4, 3, 3] 
  },
  { 
    id: "ripple", 
    name: "XRP", 
    symbol: "XRP", 
    image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    color: "xrp", 
    rankings: [5, 5, 5, 5, 4] 
  },
  { 
    id: "solana", 
    name: "Solana", 
    symbol: "SOL", 
    image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
    color: "solana", 
    rankings: [6, 6, 6, 6, 6] 
  },
  { 
    id: "usd-coin", 
    name: "USDC", 
    symbol: "USDC", 
    image: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    color: "stablecoin", 
    rankings: [7, 7, 7, 7, 7] 
  },
  { 
    id: "staked-ether", 
    name: "Lido Staked Ether", 
    symbol: "STETH", 
    image: "https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
    color: "ethereum", 
    rankings: [8, 8, 9, 10, 10] 
  },
  { 
    id: "tron", 
    name: "TRON", 
    symbol: "TRX", 
    image: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193",
    color: "altcoin", 
    rankings: [9, 9, 8, 8, 8] 
  },
  { 
    id: "dogecoin", 
    name: "Dogecoin", 
    symbol: "DOGE", 
    image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    color: "meme", 
    rankings: [10, 10, 10, 9, 9] 
  },
  { 
    id: "cardano", 
    name: "Cardano", 
    symbol: "ADA", 
    image: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    color: "altcoin", 
    rankings: [11, 11, 11, 11, 12] 
  },
  { 
    id: "avalanche", 
    name: "Avalanche", 
    symbol: "AVAX", 
    image: "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369",
    color: "altcoin", 
    rankings: [12, 13, 14, -1, -1] 
  },
  { 
    id: "shiba-inu", 
    name: "Shiba Inu", 
    symbol: "SHIB", 
    image: "https://coin-images.coingecko.com/coins/images/11939/large/shiba.png?1696511800",
    color: "meme", 
    rankings: [13, 12, 12, 13, 14] 
  },
  { 
    id: "polkadot", 
    name: "Polkadot", 
    symbol: "DOT", 
    image: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008",
    color: "altcoin", 
    rankings: [14, 14, 13, 12, 11] 
  },
  { 
    id: "chainlink", 
    name: "Chainlink", 
    symbol: "LINK", 
    image: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
    color: "altcoin", 
    rankings: [15, 15, 15, 14, 13] 
  },
  { 
    id: "polygon", 
    name: "Polygon", 
    symbol: "MATIC", 
    image: "https://coin-images.coingecko.com/coins/images/4713/large/matic-token-icon.png?1696505277",
    color: "altcoin", 
    rankings: [-1, -1, -1, 15, 15] 
  },
];

export const CryptoTrajectories = () => {
  const [hoveredCrypto, setHoveredCrypto] = useState<string | null>(null);
  const barRefs = useState<Map<string, HTMLDivElement>>(new Map())[0];

  const getCryptosAtWeek = (weekIndex: number) => {
    return cryptoData
      .filter((crypto) => crypto.rankings[weekIndex] !== -1)
      .sort((a, b) => a.rankings[weekIndex] - b.rankings[weekIndex]);
  };

  const getRankChange = (crypto: CryptoRanking, weekIndex: number) => {
    if (weekIndex === 0) return null;
    const currentRank = crypto.rankings[weekIndex];
    
    if (currentRank === -1) return null;
    
    // Find the previous week where this crypto appeared
    let previousRank = -1;
    for (let i = weekIndex - 1; i >= 0; i--) {
      if (crypto.rankings[i] !== -1) {
        previousRank = crypto.rankings[i];
        break;
      }
    }
    
    if (previousRank === -1) return null;
    
    return previousRank - currentRank;
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        {/* Decorative border */}
        <div className="border-4 border-decorative-border rounded-lg p-8 relative">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-decorative-accent -m-1" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-decorative-accent -m-1" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-decorative-accent -m-1" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-decorative-accent -m-1" />

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-sm tracking-widest text-muted-foreground mb-2 font-sans uppercase">
              Crypto Market Trajectories:
            </h2>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              TOP 15 CRYPTOCURRENCIES
              <br />
              BY MARKET CAP
              <br />
              WEEKLY RANKINGS
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-4">
              Track how the top cryptocurrencies shift positions in the market cap rankings
              <br />
              over the past five weeks. Hover over any crypto to see its trajectory.
            </p>
            <div className="inline-block border border-border px-6 py-2 text-sm">
              Ranking based on market capitalization (USD)
            </div>
          </div>

          {/* Chart */}
          <div className="relative mb-16">
            {/* Week labels */}
            <div className="flex justify-between mb-8 px-4">
              {weeks.map((week) => (
                <div key={week} className="text-xl font-bold text-center w-40">
                  {week}
                </div>
              ))}
            </div>

            {/* SVG connections container - only show when hovering */}
            {hoveredCrypto && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                {cryptoData
                  .filter((crypto) => crypto.id === hoveredCrypto)
                  .map((crypto) => {
                    const paths = [];
                    for (let i = 0; i < weeks.length - 1; i++) {
                      if (
                        crypto.rankings[i] !== -1 &&
                        crypto.rankings[i + 1] !== -1
                      ) {
                        paths.push(
                          <ConnectionPath
                            key={`${crypto.id}-${i}`}
                            crypto={crypto}
                            fromWeekIndex={i}
                            toWeekIndex={i + 1}
                            isHovered={true}
                            isDimmed={false}
                            barRefs={barRefs}
                          />
                        );
                      }
                    }
                    return paths;
                  })}
              </svg>
            )}

            {/* Crypto bars */}
            <div className="flex justify-between relative" style={{ zIndex: 1 }}>
              {weeks.map((week, weekIndex) => (
                <div key={week} className="flex flex-col gap-2 w-40">
                  {getCryptosAtWeek(weekIndex).map((crypto) => {
                    const currentRank = crypto.rankings[weekIndex];
                    const rankChange = getRankChange(crypto, weekIndex);

                    return (
                      <div key={`${crypto.id}-${weekIndex}`} className="relative">
                        {/* Rank circle - only show on first column */}
                        {weekIndex === 0 && (
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-2 border-foreground flex items-center justify-center">
                            <span className="text-xs font-bold">{currentRank}</span>
                          </div>
                        )}
                        
                        {/* Rank change indicator - show on all columns except first */}
                        {weekIndex > 0 && (
                          <div className={cn(
                            "absolute -left-8 top-1/2 -translate-y-1/2 text-xs font-bold",
                            rankChange === null ? "text-muted-foreground" :
                            rankChange > 0 ? "text-green-400" : 
                            rankChange < 0 ? "text-red-400" : 
                            "text-muted-foreground"
                          )}>
                            {rankChange === null ? "–" : rankChange > 0 ? `+${rankChange}` : rankChange < 0 ? rankChange : "–"}
                          </div>
                        )}
                        
                        <CryptoBar
                          crypto={crypto}
                          rank={currentRank}
                          isHovered={hoveredCrypto === crypto.id}
                          isDimmed={hoveredCrypto !== null && hoveredCrypto !== crypto.id}
                          onHover={setHoveredCrypto}
                          weekIndex={weekIndex}
                          barRef={(el) => {
                            if (el) {
                              barRefs.set(`${crypto.id}-${weekIndex}`, el);
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="border-t border-border pt-8">
            <h3 className="text-2xl font-serif font-bold text-center mb-8">
              NOTABLE MOVEMENTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HighlightCard
                flag="🪙"
                title="BNB climbed from #4 to #3"
                description="showing strong market momentum over the past 5 weeks."
              />
              <HighlightCard
                flag="🐕"
                title="Dogecoin moved up from #10 to #9"
                description="as meme coin sentiment improved across the market."
              />
              <HighlightCard
                flag="🔗"
                title="Chainlink surged from #15 to #13"
                description="with increased adoption and network activity."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-xs text-muted-foreground">
            DATA SOURCE: COINGECKO API • RANKINGS BASED ON MARKET CAP
          </div>
        </div>
      </div>
    </div>
  );
};
