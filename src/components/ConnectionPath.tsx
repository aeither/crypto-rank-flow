import { CryptoRanking } from "./CryptoTrajectories";

interface ConnectionPathProps {
  crypto: CryptoRanking;
  fromWeekIndex: number;
  toWeekIndex: number;
  isHovered: boolean;
  isDimmed: boolean;
  barRefs: Map<string, HTMLDivElement>;
}

const colorMap = {
  bitcoin: "#f7931a",
  ethereum: "#627eea",
  stablecoin: "#26a17b",
  bnb: "#f3ba2f",
  xrp: "#23292f",
  solana: "#9945ff",
  altcoin: "#667eea",
  meme: "#f59e0b",
};

export const ConnectionPath = ({
  crypto,
  fromWeekIndex,
  toWeekIndex,
  isHovered,
  isDimmed,
  barRefs,
}: ConnectionPathProps) => {
  const fromRank = crypto.rankings[fromWeekIndex];
  const toRank = crypto.rankings[toWeekIndex];

  if (fromRank === -1 || toRank === -1) return null;

  // Get actual DOM positions
  const fromBar = barRefs.get(`${crypto.id}-${fromWeekIndex}`);
  const toBar = barRefs.get(`${crypto.id}-${toWeekIndex}`);

  if (!fromBar || !toBar) return null;

  const fromRect = fromBar.getBoundingClientRect();
  const toRect = toBar.getBoundingClientRect();
  
  // Get the parent container that has the flex layout
  const parentContainer = fromBar.closest('.flex.justify-between');
  if (!parentContainer) return null;
  const containerRect = parentContainer.getBoundingClientRect();

  // Calculate positions relative to the parent container
  const x1 = fromRect.right - containerRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
  const x2 = toRect.left - containerRect.left;
  const y2 = toRect.top + toRect.height / 2 - containerRect.top;

  const color = colorMap[crypto.color as keyof typeof colorMap];

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={6}
      opacity={1}
      className="transition-all duration-200"
      style={{ strokeLinecap: "round" }}
    />
  );
};
