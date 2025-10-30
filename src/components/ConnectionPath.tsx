import { CountryRanking } from "./EconomicTrajectories";

interface ConnectionPathProps {
  country: CountryRanking;
  fromYearIndex: number;
  toYearIndex: number;
  isHovered: boolean;
  isDimmed: boolean;
}

const colorMap = {
  us: "#3b82f6",
  china: "#ef4444",
  india: "#f59e0b",
  europe: "#8b5cf6",
  americas: "#10b981",
  africa: "#eab308",
  asia: "#ef4444",
};

export const ConnectionPath = ({
  country,
  fromYearIndex,
  toYearIndex,
  isHovered,
  isDimmed,
}: ConnectionPathProps) => {
  // Calculate positions based on rankings
  const fromRank = country.rankings[fromYearIndex];
  const toRank = country.rankings[toYearIndex];

  if (fromRank === -1 || toRank === -1) return null;

  // Approximate positions (these would need to be calculated based on actual DOM positions)
  const columnWidth = 220; // approximate width between columns
  const barHeight = 48; // approximate height of each bar
  const barGap = 8; // gap between bars

  const x1 = fromYearIndex * columnWidth + 160; // start from right side of bar
  const y1 = fromRank * (barHeight + barGap) - barGap + barHeight / 2;
  const x2 = toYearIndex * columnWidth;
  const y2 = toRank * (barHeight + barGap) - barGap + barHeight / 2;

  // Create straight line path
  const path = `M ${x1} ${y1} L ${x2} ${y2}`;

  const color = colorMap[country.color as keyof typeof colorMap];

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
