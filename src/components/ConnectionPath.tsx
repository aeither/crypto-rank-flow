import { CountryRanking } from "./EconomicTrajectories";

interface ConnectionPathProps {
  country: CountryRanking;
  fromYearIndex: number;
  toYearIndex: number;
  isHovered: boolean;
  isDimmed: boolean;
  barRefs: Map<string, HTMLDivElement>;
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
  barRefs,
}: ConnectionPathProps) => {
  const fromRank = country.rankings[fromYearIndex];
  const toRank = country.rankings[toYearIndex];

  if (fromRank === -1 || toRank === -1) return null;

  // Get actual DOM positions
  const fromBar = barRefs.get(`${country.country}-${fromYearIndex}`);
  const toBar = barRefs.get(`${country.country}-${toYearIndex}`);

  if (!fromBar || !toBar) return null;

  const fromRect = fromBar.getBoundingClientRect();
  const toRect = toBar.getBoundingClientRect();
  
  // Get the SVG container position
  const svgContainer = fromBar.closest('.relative');
  if (!svgContainer) return null;
  const containerRect = svgContainer.getBoundingClientRect();

  // Calculate positions relative to the container
  const x1 = fromRect.right - containerRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
  const x2 = toRect.left - containerRect.left;
  const y2 = toRect.top + toRect.height / 2 - containerRect.top;

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
