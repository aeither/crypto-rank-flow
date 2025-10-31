import { useState, useMemo, memo } from "react"
import { cryptos } from "@/data/cryptoData"
import { CryptoData } from "@/data/cryptoData"

const weeks = ["week1", "week2", "week3", "week4", "week5"] as const
const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]

const CryptoPath = memo(
  ({
    crypto,
    width,
    height,
    isHovered,
    isOtherHovered,
    onMouseEnter,
    onMouseLeave,
  }: {
    crypto: CryptoData
    width: number
    height: number
    isHovered: boolean
    isOtherHovered: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
  }) => {
    const getYPosition = (rank: number, totalRanks: number, height: number) => {
      const spacing = height / (totalRanks + 1)
      return spacing * rank
    }

    const createPath = (crypto: CryptoData, width: number, height: number) => {
      const points: Array<{ x: number; y: number; exists: boolean }> = []

      weeks.forEach((week, index) => {
        const x = (width / (weeks.length - 1)) * index
        const rank = crypto.ranks[week]

        if (rank !== undefined) {
          const y = getYPosition(rank, 100, height)
          points.push({ x, y, exists: true })
        } else {
          points.push({ x, y: 0, exists: false })
        }
      })

      const firstExistingIndex = points.findIndex((p) => p.exists)
      const lastExistingIndex = points.map((p) => p.exists).lastIndexOf(true)

      if (firstExistingIndex === -1) return ""

      let path = `M ${points[firstExistingIndex].x} ${points[firstExistingIndex].y}`

      for (let i = firstExistingIndex; i < lastExistingIndex; i++) {
        const current = points[i]
        const next = points[i + 1]

        if (current.exists && next.exists) {
          const controlPointX = (current.x + next.x) / 2
          path += ` C ${controlPointX} ${current.y}, ${controlPointX} ${next.y}, ${next.x} ${next.y}`
        }
      }

      return path
    }

    const path = useMemo(() => createPath(crypto, width, height), [crypto, width, height])

    return (
      <g>
        {isHovered && (
          <path
            d={path}
            transform="translate(150, 20)"
            fill="none"
            stroke={crypto.color}
            strokeWidth="12"
            opacity="0.3"
            filter="blur(8px)"
            pointerEvents="none"
          />
        )}

        <path
          d={path}
          transform="translate(150, 20)"
          fill="none"
          stroke={crypto.color}
          strokeWidth={isHovered ? "6" : "3"}
          opacity={isOtherHovered ? 0.15 : isHovered ? 1 : 0.7}
          className="transition-all duration-200 cursor-pointer"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            filter: isHovered ? "brightness(1.2)" : "none",
          }}
        />

        {weeks.map((week, weekIndex) => {
          const rank = crypto.ranks[week]

          if (rank === undefined) return null

          const x = 150 + ((1200 - 300) / (weeks.length - 1)) * weekIndex
          const y = 20 + getYPosition(rank, 100, height)

          const allWeeks = Object.keys(crypto.ranks)
          const firstWeek = allWeeks[0]
          const lastWeek = allWeeks[allWeeks.length - 1]
          const isFirstAppearance = week === firstWeek
          const isLastAppearance = week === lastWeek

          return (
            <g
              key={`${crypto.id}-${week}`}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="cursor-pointer"
            >
              <circle
                cx={x}
                cy={y}
                r={isHovered ? "14" : "10"}
                fill="#000000"
                opacity={isOtherHovered ? 0.3 : 1}
                className="transition-all duration-200"
              />

              <circle
                cx={x}
                cy={y}
                r={isHovered ? "12" : "8"}
                fill={crypto.color}
                opacity={isOtherHovered ? 0.2 : 1}
                className="transition-all duration-200"
              />

              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={isHovered ? "11" : "9"}
                fontWeight="700"
                opacity={isOtherHovered ? 0.3 : 1}
                className="transition-all duration-200"
              >
                {rank}
              </text>

              {isFirstAppearance && (
                <>
                  <rect
                    x={x - 130}
                    y={y - 14}
                    width="110"
                    height="28"
                    rx="6"
                    fill={crypto.color}
                    opacity={isOtherHovered ? 0.2 : isHovered ? 1 : 0.9}
                    className="transition-all duration-200"
                  />
                  <image
                    href={crypto.image}
                    x={x - 120}
                    y={y - 9}
                    width="18"
                    height="18"
                    opacity={isOtherHovered ? 0.3 : 1}
                    className="transition-opacity duration-200"
                  />
                  <text
                    x={x - 60}
                    y={y + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="700"
                    opacity={isOtherHovered ? 0.3 : 1}
                    className="transition-opacity duration-200"
                  >
                    {crypto.symbol}
                  </text>
                </>
              )}

              {isLastAppearance && (
                <>
                  <rect
                    x={x + 20}
                    y={y - 14}
                    width="110"
                    height="28"
                    rx="6"
                    fill={crypto.color}
                    opacity={isOtherHovered ? 0.2 : isHovered ? 1 : 0.9}
                    className="transition-all duration-200"
                  />
                  <image
                    href={crypto.image}
                    x={x + 30}
                    y={y - 9}
                    width="18"
                    height="18"
                    opacity={isOtherHovered ? 0.3 : 1}
                    className="transition-opacity duration-200"
                  />
                  <text
                    x={x + 85}
                    y={y + 5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="700"
                    opacity={isOtherHovered ? 0.3 : 1}
                    className="transition-opacity duration-200"
                  >
                    {crypto.symbol}
                  </text>
                </>
              )}
            </g>
          )
        })}
      </g>
    )
  },
)

CryptoPath.displayName = "CryptoPath"

export default function EconomicChart() {
  const [hoveredCrypto, setHoveredCrypto] = useState<string | null>(null)

  const svgHeight = 3600
  const svgWidth = 1200

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Decorative border */}
        <div className="border-2 sm:border-3 md:border-4 border-amber-500 bg-black p-4 sm:p-6 md:p-8 lg:p-12 relative">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-t-2 border-l-2 sm:border-t-3 sm:border-l-3 md:border-t-4 md:border-l-4 border-amber-400 -m-1" />
          <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-t-2 border-r-2 sm:border-t-3 sm:border-r-3 md:border-t-4 md:border-r-4 border-amber-400 -m-1" />
          <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-b-2 border-l-2 sm:border-b-3 sm:border-l-3 md:border-b-4 md:border-l-4 border-amber-400 -m-1" />
          <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-b-2 border-r-2 sm:border-b-3 sm:border-r-3 md:border-b-4 md:border-r-4 border-amber-400 -m-1" />

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xs sm:text-sm md:text-base tracking-widest text-[#C9A66B] mb-2 sm:mb-3 md:mb-4 font-sans uppercase">
              CRYPTO MARKET TRAJECTORIES:
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-white">
              TOP 100
              <br />
              CRYPTOCURRENCIES
              <br />
              BY MARKET CAP
              <br />
              WEEKLY RANKINGS
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#C9A66B] max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
              Track how the top cryptocurrencies shift positions in the market cap rankings
              <br className="hidden sm:block" />
              <span className="sm:inline block"> over the past five weeks. Hover over any crypto to see its trajectory.</span>
            </p>
            <div className="inline-block border border-[#C9A66B] px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base text-white">
              Ranking based on market capitalization (USD)
            </div>
          </div>

          {/* Chart */}
          <div className="relative w-full overflow-x-auto">
            <svg
              width="100%"
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="xMidYMid meet"
              className="overflow-visible min-w-[800px]"
            >
              {weeks.map((week, index) => {
                const x = 150 + ((svgWidth - 300) / (weeks.length - 1)) * index
                return (
                  <g key={week}>
                    <line x1={x} y1={20} x2={x} y2={svgHeight - 20} stroke="#334155" strokeWidth="2" />
                    <text x={x} y={15} textAnchor="middle" fill="#cbd5e1" fontSize="20" fontWeight="700">
                      {weekLabels[index]}
                    </text>
                  </g>
                )
              })}

              {cryptos.map((crypto) => {
                const isHovered = hoveredCrypto === crypto.id
                const isOtherHovered = hoveredCrypto && hoveredCrypto !== crypto.id

                return (
                  <CryptoPath
                    key={crypto.id}
                    crypto={crypto}
                    width={svgWidth - 300}
                    height={svgHeight - 40}
                    isHovered={isHovered}
                    isOtherHovered={!!isOtherHovered}
                    onMouseEnter={() => setHoveredCrypto(crypto.id)}
                    onMouseLeave={() => setHoveredCrypto(null)}
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
