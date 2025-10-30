import { CryptoRanking } from "./CryptoTrajectories";
import { cn } from "@/lib/utils";

interface CryptoBarProps {
  crypto: CryptoRanking;
  rank: number;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (crypto: string | null) => void;
  weekIndex: number;
  barRef: (el: HTMLDivElement | null) => void;
}

const colorMap = {
  bitcoin: "bg-crypto-bitcoin",
  ethereum: "bg-crypto-ethereum",
  stablecoin: "bg-crypto-stablecoin",
  bnb: "bg-crypto-bnb",
  xrp: "bg-crypto-xrp",
  solana: "bg-crypto-solana",
  altcoin: "bg-crypto-altcoin",
  meme: "bg-crypto-meme",
};

export const CryptoBar = ({
  crypto,
  rank,
  isHovered,
  isDimmed,
  onHover,
  weekIndex,
  barRef,
}: CryptoBarProps) => {
  return (
    <div
      ref={barRef}
      className={cn(
        "relative rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-300",
        colorMap[crypto.color as keyof typeof colorMap],
        isHovered && "ring-4 ring-primary scale-105",
        isDimmed && "opacity-20",
        !isHovered && !isDimmed && "opacity-100 hover:opacity-90"
      )}
      onMouseEnter={() => onHover(crypto.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2">
        <img src={crypto.image} alt={crypto.name} className="w-5 h-5 rounded-full" />
        <span className="text-sm font-semibold text-white">
          {crypto.symbol}
        </span>
      </div>
    </div>
  );
};
