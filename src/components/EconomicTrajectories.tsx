import { useState } from "react";
import { CountryBar } from "./CountryBar";
import { ConnectionPath } from "./ConnectionPath";
import { HighlightCard } from "./HighlightCard";
import { cn } from "@/lib/utils";

export interface CountryRanking {
  country: string;
  flag: string;
  color: string;
  rankings: number[];
}

const years = ["1980", "2000", "2022", "2050P", "2075P"];

const countryData: CountryRanking[] = [
  { country: "U.S.", flag: "🇺🇸", color: "us", rankings: [1, 1, 1, 2, 3] },
  { country: "Japan", flag: "🇯🇵", color: "asia", rankings: [2, 2, 3, 6, 12] },
  { country: "Germany", flag: "🇩🇪", color: "europe", rankings: [3, 3, 4, 5, 9] },
  { country: "France", flag: "🇫🇷", color: "europe", rankings: [4, 5, 7, 9, 15] },
  { country: "UK", flag: "🇬🇧", color: "europe", rankings: [5, 4, 6, 8, 10] },
  { country: "Italy", flag: "🇮🇹", color: "europe", rankings: [6, 7, 10, -1, -1] },
  { country: "China", flag: "🇨🇳", color: "china", rankings: [7, 6, 2, 1, 1] },
  { country: "Canada", flag: "🇨🇦", color: "americas", rankings: [8, 8, 8, 14, -1] },
  { country: "Argentina", flag: "🇦🇷", color: "americas", rankings: [9, -1, -1, -1, -1] },
  { country: "Spain", flag: "🇪🇸", color: "europe", rankings: [10, 11, 15, -1, -1] },
  { country: "Mexico", flag: "🇲🇽", color: "americas", rankings: [11, 9, 14, 11, 11] },
  { country: "Netherlands", flag: "🇳🇱", color: "europe", rankings: [12, 14, -1, -1, -1] },
  { country: "India", flag: "🇮🇳", color: "india", rankings: [13, 13, 5, 3, 2] },
  { country: "Saudi Arabia", flag: "🇸🇦", color: "africa", rankings: [14, -1, 13, -1, -1] },
  { country: "Australia", flag: "🇦🇺", color: "europe", rankings: [15, 15, 13, -1, -1] },
  { country: "Brazil", flag: "🇧🇷", color: "americas", rankings: [-1, 10, 11, 8, 8] },
  { country: "S. Korea", flag: "🇰🇷", color: "asia", rankings: [-1, 12, 12, -1, -1] },
  { country: "Indonesia", flag: "🇮🇩", color: "asia", rankings: [-1, -1, 4, 4, 4] },
  { country: "Russia", flag: "🇷🇺", color: "europe", rankings: [-1, -1, 9, 10, 13] },
  { country: "Egypt", flag: "🇪🇬", color: "africa", rankings: [-1, -1, 12, 7, 7] },
  { country: "Nigeria", flag: "🇳🇬", color: "africa", rankings: [-1, -1, -1, 15, 5] },
  { country: "Pakistan", flag: "🇵🇰", color: "asia", rankings: [-1, -1, -1, -1, 6] },
  { country: "Philippines", flag: "🇵🇭", color: "asia", rankings: [-1, -1, -1, -1, 14] },
];

export const EconomicTrajectories = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const getCountriesAtYear = (yearIndex: number) => {
    return countryData
      .filter((country) => country.rankings[yearIndex] !== -1)
      .sort((a, b) => a.rankings[yearIndex] - b.rankings[yearIndex]);
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
              Economic Trajectories:
            </h2>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              THE WORLD'S
              <br />
              TOP 15 ECONOMIES
              <br />
              THROUGH TIME
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-4">
              According to projections from Goldman Sachs, the weight of global GDP
              <br />
              will shift substantially towards Asia over the next several decades.
            </p>
            <div className="inline-block border border-border px-6 py-2 text-sm">
              Ranking based on real GDP projections (2021 USD)
            </div>
          </div>

          {/* Chart */}
          <div className="relative mb-16">
            {/* Year labels */}
            <div className="flex justify-between mb-8 px-4">
              {years.map((year) => (
                <div key={year} className="text-xl font-bold text-center w-40">
                  {year}
                </div>
              ))}
            </div>

            {/* SVG connections container - only show when hovering */}
            {hoveredCountry && (
              <svg
                className="absolute top-16 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                {countryData
                  .filter((country) => country.country === hoveredCountry)
                  .map((country) => {
                    const paths = [];
                    for (let i = 0; i < years.length - 1; i++) {
                      if (
                        country.rankings[i] !== -1 &&
                        country.rankings[i + 1] !== -1
                      ) {
                        paths.push(
                          <ConnectionPath
                            key={`${country.country}-${i}`}
                            country={country}
                            fromYearIndex={i}
                            toYearIndex={i + 1}
                            isHovered={true}
                            isDimmed={false}
                          />
                        );
                      }
                    }
                    return paths;
                  })}
              </svg>
            )}

            {/* Country bars */}
            <div className="flex justify-between relative" style={{ zIndex: 1 }}>
              {years.map((year, yearIndex) => (
                <div key={year} className="flex flex-col gap-2 w-40">
                  {getCountriesAtYear(yearIndex).map((country) => {
                    const previousRank = yearIndex > 0 ? country.rankings[yearIndex - 1] : undefined;
                    const currentRank = country.rankings[yearIndex];
                    const rankChange = previousRank !== undefined && previousRank !== -1 
                      ? previousRank - currentRank 
                      : undefined;

                    return (
                      <div key={`${country.country}-${yearIndex}`} className="relative">
                        {/* Rank circle - only show on first column */}
                        {yearIndex === 0 && (
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-2 border-foreground flex items-center justify-center">
                            <span className="text-xs font-bold">{currentRank}</span>
                          </div>
                        )}
                        
                        {/* Rank change indicator - show on all columns except first */}
                        {yearIndex > 0 && rankChange !== undefined && (
                          <div className={cn(
                            "absolute -left-8 top-1/2 -translate-y-1/2 text-xs font-bold",
                            rankChange > 0 ? "text-green-400" : rankChange < 0 ? "text-red-400" : "text-muted-foreground"
                          )}>
                            {rankChange > 0 ? `+${rankChange}` : rankChange < 0 ? rankChange : "–"}
                          </div>
                        )}
                        
                        <CountryBar
                          country={country}
                          rank={currentRank}
                          isHovered={hoveredCountry === country.country}
                          isDimmed={hoveredCountry !== null && hoveredCountry !== country.country}
                          onHover={setHoveredCountry}
                          yearIndex={yearIndex}
                          previousRank={previousRank}
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
              HIGHLIGHTS FROM 2075
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HighlightCard
                flag="🇮🇩"
                title="Indonesia, which has the world's fourth largest population of 277M,"
                description="could grow its GDP from $1.3T in 2022 to nearly $14T by 2075."
              />
              <HighlightCard
                flag="🇯🇵"
                title="Japan's GDP is expected to grow by less than 1%"
                description="over the next several decades, pushing it out of the top 10 by 2075."
              />
              <HighlightCard
                flag="🇨🇳"
                title="Although China's population is beginning to shrink, its"
                description="GDP could climb to $57T by 2075, keeping ahead of India ($52.5T) and the U.S. ($51.5T)."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-xs text-muted-foreground">
            SOURCE: GOLDMAN SACHS GLOBAL INVESTMENT RESEARCH (2022)
          </div>
        </div>
      </div>
    </div>
  );
};
