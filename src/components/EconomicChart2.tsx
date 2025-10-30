import { useState } from 'react';
import { cryptoData } from '../data/economicData';

const CryptoChart = () => {
  const [hoveredCrypto, setHoveredCrypto] = useState<string | null>(null);
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

  const getOpacity = (cryptoId: string) => {
    if (!hoveredCrypto) return 1;
    return hoveredCrypto === cryptoId ? 1 : 0.2;
  };

  const getPositionChange = (cryptoId: string, currentWeek: string, weeks: string[]): number | null => {
    const currentWeekIndex = weeks.indexOf(currentWeek);
    if (currentWeekIndex === 0) return null;

    const previousWeek = weeks[currentWeekIndex - 1];
    const previousWeekData = cryptoData[previousWeek];
    const currentWeekData = cryptoData[currentWeek];

    const previousRank = previousWeekData.findIndex(entry => entry?.id === cryptoId);
    const currentRank = currentWeekData.findIndex(entry => entry?.id === cryptoId);

    if (previousRank === -1) return null;
    if (currentRank === -1) return null;

    return previousRank - currentRank;
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-2 sm:p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 md:mb-8">
        <div className="border-2 md:border-4 border-amber-600 p-4 md:p-6 relative">
          <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 md:border-t-4 md:border-l-4 border-amber-400 -m-1"></div>
          <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 md:border-t-4 md:border-r-4 border-amber-400 -m-1"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 md:border-b-4 md:border-l-4 border-amber-400 -m-1"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 md:border-b-4 md:border-r-4 border-amber-400 -m-1"></div>

          <div>
            <h2 className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 tracking-widest">CRYPTO TRAJECTORIES:</h2>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 leading-tight">
              TOP 100 CRYPTOCURRENCIES<br />
              BY MARKET CAP
            </h1>
            <p className="text-gray-400 text-xs md:text-sm max-w-xl mb-2 md:mb-4">
              Track the evolution of cryptocurrency rankings over the past 5 weeks.
              Hover over any coin to see its journey through the rankings.
            </p>
            <div className="border border-white md:border-2 inline-block px-2 py-1 md:px-4 md:py-2">
              <p className="text-[10px] md:text-xs">Ranking based on market capitalization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="max-w-7xl mx-auto relative">
        <div className="flex pl-8 md:pl-12">
          <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-8 mb-2 md:mb-4 flex-1">
            {weeks.map((week) => (
              <div key={week} className="text-center">
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2">{week}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* Rank labels on the left */}
          <div className="flex flex-col mr-1 md:mr-2 gap-1 md:gap-2">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="h-[34px] md:h-[52px] flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white md:border-2 flex items-center justify-center text-[10px] md:text-xs font-bold">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Chart content */}
          <div className="flex-1">
            <div className="space-y-1 md:space-y-2">
              {[...Array(100)].map((_, rank) => (
                <div key={rank} className="grid grid-cols-5 gap-2 md:gap-6 lg:gap-10 h-[34px] md:h-[52px]">
                  {weeks.map((week) => {
                    const entry = cryptoData[week]?.[rank];
                    if (!entry) return <div key={week} className="h-[34px] md:h-[52px]"></div>;

                    const positionChange = getPositionChange(entry.id, week, weeks);

                    return (
                      <div
                        key={`${week}-${rank}`}
                        className="h-[34px] md:h-[52px] flex items-center transition-opacity duration-300"
                        style={{ opacity: getOpacity(entry.id) }}
                      >
                        <div
                          className={`${entry.color} rounded px-1.5 py-1 md:px-3 md:py-2 flex items-center gap-1 md:gap-2 cursor-pointer hover:scale-105 transition-all duration-200 w-full h-full`}
                          onMouseEnter={() => setHoveredCrypto(entry.id)}
                          onMouseLeave={() => setHoveredCrypto(null)}
                        >
                          <img
                            src={entry.image}
                            alt={entry.name}
                            className="w-4 h-4 md:w-7 md:h-7 rounded-full flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0 hidden sm:block">
                            <div className="font-bold text-[10px] md:text-xs leading-tight">{entry.symbol}</div>
                            <div className="text-[8px] md:text-[10px] opacity-80 truncate leading-tight">{entry.name}</div>
                          </div>
                          <div className="flex-1 min-w-0 sm:hidden">
                            <div className="font-bold text-[10px] leading-tight">{entry.symbol}</div>
                          </div>

                          {/* Position change indicator */}
                          {positionChange !== null && (
                            <span
                              className={`text-[10px] md:text-xs font-bold flex-shrink-0 ${
                                positionChange > 0
                                  ? 'text-green-300'
                                  : positionChange < 0
                                  ? 'text-red-300'
                                  : 'text-gray-400'
                              }`}
                            >
                              {positionChange > 0 ? `+${positionChange}` : positionChange < 0 ? positionChange : '−'}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 md:mt-8 text-center text-[10px] md:text-xs text-gray-500">
          Data based on market capitalization rankings
        </div>
      </div>
    </div>
  );
};

export default CryptoChart;
