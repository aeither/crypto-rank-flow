import { CountryRanking } from "./EconomicTrajectories";
import { cn } from "@/lib/utils";

interface CountryBarProps {
  country: CountryRanking;
  rank: number;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (country: string | null) => void;
  yearIndex: number;
  previousRank?: number;
}

const colorMap = {
  us: "bg-country-us",
  china: "bg-country-china",
  india: "bg-country-india",
  europe: "bg-country-europe",
  americas: "bg-country-americas",
  africa: "bg-country-africa",
  asia: "bg-country-asia",
};

export const CountryBar = ({
  country,
  rank,
  isHovered,
  isDimmed,
  onHover,
}: CountryBarProps) => {
  return (
    <div
      className={cn(
        "relative rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-300",
        colorMap[country.color as keyof typeof colorMap],
        isHovered && "ring-4 ring-primary scale-105",
        isDimmed && "opacity-20",
        !isHovered && !isDimmed && "opacity-100 hover:opacity-90"
      )}
      onMouseEnter={() => onHover(country.country)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm">{country.flag}</span>
        <span className="text-sm font-semibold text-white">
          {country.country}
        </span>
      </div>
    </div>
  );
};
