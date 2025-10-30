export interface CryptoEntry {
    id: string;
    symbol: string;
    name: string;
    image: string;
    color: string;
  }
  
  import { generateTop100Data } from './generateCryptoData';
  
  export const cryptoData = generateTop100Data();
  