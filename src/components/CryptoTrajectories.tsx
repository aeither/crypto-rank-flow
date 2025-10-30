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

// Generate mock data for top 100 cryptocurrencies with realistic rank changes
const generateCryptoData = (): CryptoRanking[] => {
  const baseData = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400", color: "bitcoin" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628", color: "ethereum" },
    { id: "tether", name: "Tether", symbol: "USDT", image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661", color: "stablecoin" },
    { id: "binancecoin", name: "BNB", symbol: "BNB", image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970", color: "bnb" },
    { id: "ripple", name: "XRP", symbol: "XRP", image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442", color: "xrp" },
    { id: "solana", name: "Solana", symbol: "SOL", image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756", color: "solana" },
    { id: "usd-coin", name: "USDC", symbol: "USDC", image: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694", color: "stablecoin" },
    { id: "staked-ether", name: "Lido Staked Ether", symbol: "STETH", image: "https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206", color: "ethereum" },
    { id: "tron", name: "TRON", symbol: "TRX", image: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193", color: "altcoin" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409", color: "meme" },
    { id: "cardano", name: "Cardano", symbol: "ADA", image: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090", color: "altcoin" },
    { id: "avalanche", name: "Avalanche", symbol: "AVAX", image: "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369", color: "altcoin" },
    { id: "shiba-inu", name: "Shiba Inu", symbol: "SHIB", image: "https://coin-images.coingecko.com/coins/images/11939/large/shiba.png?1696511800", color: "meme" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", image: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008", color: "altcoin" },
    { id: "chainlink", name: "Chainlink", symbol: "LINK", image: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009", color: "altcoin" },
  ];

  // Generate remaining cryptos with generic data
  for (let i = baseData.length + 1; i <= 100; i++) {
    baseData.push({
      id: `crypto-${i}`,
      name: `Crypto ${i}`,
      symbol: `CRY${i}`,
      image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      color: "altcoin"
    });
  }

  // Generate rankings with some variation
  return baseData.map((crypto, index) => {
    const baseRank = index + 1;
    const rankings = [];
    
    for (let week = 0; week < 5; week++) {
      // Add some random variation (-3 to +3) but keep within bounds
      const variation = Math.floor(Math.random() * 7) - 3;
      let rank = baseRank + variation;
      rank = Math.max(1, Math.min(100, rank)); // Keep between 1 and 100
      rankings.push(rank);
    }
    
    return {
      ...crypto,
      rankings
    };
  });
};

const cryptoData: CryptoRanking[] = generateCryptoData();

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
    const previousRank = crypto.rankings[weekIndex - 1];
    
    if (currentRank === -1 || previousRank === -1) return null;
    
    // Lower rank number is better (rank 1 > rank 5)
    // So if we go from 5 to 4, that's +1 (improvement)
    // If we go from 4 to 5, that's -1 (decline)
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
              TOP 100 CRYPTOCURRENCIES
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


            {/* Crypto bars */}
            <div className="flex justify-between relative" style={{ zIndex: 1 }}>
              {weeks.map((week, weekIndex) => (
                <div key={week} className="flex flex-col gap-2">
                  {getCryptosAtWeek(weekIndex).map((crypto) => {
                    const currentRank = crypto.rankings[weekIndex];
                    const rankChange = getRankChange(crypto, weekIndex);

                    return (
                      <div key={`${crypto.id}-${weekIndex}`} className="flex items-center gap-2">
                        {/* Rank circle or change indicator */}
                        <div className="w-8 flex-shrink-0 flex items-center justify-center">
                          {weekIndex === 0 ? (
                            <div className="w-5 h-5 rounded-full bg-background border-2 border-foreground flex items-center justify-center">
                              <span className="text-xs font-bold">{currentRank}</span>
                            </div>
                          ) : (
                            <span className={cn(
                              "text-xs font-bold",
                              rankChange === null ? "text-muted-foreground" :
                              rankChange > 0 ? "text-green-400" : 
                              rankChange < 0 ? "text-red-400" : 
                              "text-muted-foreground"
                            )}>
                              {rankChange === null ? "–" : rankChange > 0 ? `+${rankChange}` : rankChange < 0 ? rankChange : "–"}
                            </span>
                          )}
                        </div>
                        
                        <div className="w-40">
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
