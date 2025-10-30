import { CryptoEntry } from './economicData';

const colors = [
  'bg-orange-500', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-purple-600',
  'bg-slate-600', 'bg-blue-500', 'bg-cyan-600', 'bg-red-600', 'bg-yellow-500',
  'bg-blue-700', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-600', 'bg-lime-600',
  'bg-amber-600', 'bg-violet-600', 'bg-fuchsia-600', 'bg-rose-600', 'bg-sky-600'
];

const topCryptos = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628' },
  { id: 'tether', symbol: 'USDT', name: 'Tether', image: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', image: 'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', image: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', image: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442' },
  { id: 'usd-coin', symbol: 'USDC', name: 'USDC', image: 'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694' },
  { id: 'staked-ether', symbol: 'STETH', name: 'Lido Staked Ether', image: 'https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', image: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090' },
  { id: 'tron', symbol: 'TRX', name: 'TRON', image: 'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', image: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409' },
  { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', image: 'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1670992574' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', image: 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', image: 'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009' },
  { id: 'matic-network', symbol: 'MATIC', name: 'Polygon', image: 'https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233684' },
  { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', image: 'https://coin-images.coingecko.com/coins/images/12504/large/uniswap-uni.png?1696512319' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', image: 'https://coin-images.coingecko.com/coins/images/2/large/litecoin.png?1696501400' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar', image: 'https://coin-images.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501482' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic', image: 'https://coin-images.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1696501717' },
  { id: 'filecoin', symbol: 'FIL', name: 'Filecoin', image: 'https://coin-images.coingecko.com/coins/images/12817/large/filecoin.png?1696512609' },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function generateTop100Data(): Record<string, CryptoEntry[]> {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
  const result: Record<string, CryptoEntry[]> = {};

  // Generate additional mock cryptos to reach 100
  const allCryptos: CryptoEntry[] = topCryptos.map((crypto, index) => ({
    ...crypto,
    color: colors[index % colors.length]
  }));

  // Generate mock data for positions 21-100
  for (let i = 21; i <= 100; i++) {
    allCryptos.push({
      id: `crypto-${i}`,
      symbol: `CRY${i}`,
      name: `Crypto ${i}`,
      image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
      color: colors[i % colors.length]
    });
  }

  // For each week, create slight variations in ranking
  weeks.forEach((week, weekIndex) => {
    if (weekIndex === 0) {
      // Week 1: base ranking
      result[week] = [...allCryptos];
    } else {
      // Subsequent weeks: create variations
      const previousWeek = result[weeks[weekIndex - 1]];
      const newRanking = [...previousWeek];

      // Randomly swap some positions to simulate market movements
      const swapCount = Math.floor(Math.random() * 15) + 10; // 10-25 swaps
      for (let i = 0; i < swapCount; i++) {
        const index1 = Math.floor(Math.random() * 100);
        const index2 = Math.min(99, Math.max(0, index1 + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10 + 1)));
        [newRanking[index1], newRanking[index2]] = [newRanking[index2], newRanking[index1]];
      }

      result[week] = newRanking;
    }
  });

  return result;
}
