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

  const midX = (x1 + x2) / 2;

  // Create curved path
  const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;

  const color = colorMap[country.color as keyof typeof colorMap];

  return (
    <path
      d={path}
      stroke={color}
      strokeWidth={isHovered ? 4 : 2}
      fill="none"
      opacity={isDimmed ? 0.1 : isHovered ? 1 : 0.3}
      className="transition-all duration-300"
      style={{ strokeLinecap: "round" }}
    />
  );
};
