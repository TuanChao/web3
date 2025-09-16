interface TokenInfo {
  symbol: string;
  name: string;
  address?: string;
  decimals?: number;
  logoURI?: string;
  chainId?: number;
}

interface TokenList {
  tokens: TokenInfo[];
}

interface CoinGeckoToken {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
}

class TokenService {
  private tokenCache = new Map<string, string>();
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour
  private cacheTimestamps = new Map<string, number>();

  // Popular token icons as fallback
  private staticIcons: Record<string, string> = {
    ETH: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    WETH: 'https://assets.coingecko.com/coins/images/2518/large/weth.png',
    BTC: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    WBTC: 'https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png',
    USDC: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    USDT: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    BUSD: 'https://assets.coingecko.com/coins/images/9576/large/BUSD.png',
    BNB: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    CAKE: 'https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo.png',
    UNI: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
    SUSHI: 'https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png',
    LINK: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    AAVE: 'https://assets.coingecko.com/coins/images/12645/large/AAVE.png',
    COMP: 'https://assets.coingecko.com/coins/images/10775/large/COMP.png',
    MKR: 'https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png',
    YFI: 'https://assets.coingecko.com/coins/images/11849/large/yfi-192x192.png',
    CRV: 'https://assets.coingecko.com/coins/images/12124/large/Curve.png',
    BAL: 'https://assets.coingecko.com/coins/images/11683/large/Balancer.png',
    SNX: 'https://assets.coingecko.com/coins/images/3406/large/SNX.png',
    '1INCH': 'https://assets.coingecko.com/coins/images/13469/large/1inch-token.png',
    MATIC: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    AVAX: 'https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png',
    FTM: 'https://assets.coingecko.com/coins/images/4001/large/Fantom.png',
    ADA: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    SOL: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    DOT: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png'
  };

  private isValidImageUrl(url: string): boolean {
    return url && (url.startsWith('http://') || url.startsWith('https://')) && 
           (url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.svg') || url.includes('.webp'));
  }

  private isCacheValid(symbol: string): boolean {
    const timestamp = this.cacheTimestamps.get(symbol);
    if (!timestamp) return false;
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  async getTokenIcon(symbol: string, address?: string): Promise<string | null> {
    const cacheKey = address || symbol.toUpperCase();
    
    // Check cache first
    if (this.isCacheValid(cacheKey) && this.tokenCache.has(cacheKey)) {
      return this.tokenCache.get(cacheKey) || null;
    }

    try {
      // Try static icons first for popular tokens
      const staticIcon = this.staticIcons[symbol.toUpperCase()];
      if (staticIcon) {
        this.tokenCache.set(cacheKey, staticIcon);
        this.cacheTimestamps.set(cacheKey, Date.now());
        return staticIcon;
      }

      // Try different services in order of preference
      let iconUrl = null;

      // 1. Try Trust Wallet Assets (if we have address)
      if (address && !iconUrl) {
        iconUrl = await this.getTrustWalletIcon(address);
      }

      // 2. Try CoinGecko API
      if (!iconUrl) {
        iconUrl = await this.getCoinGeckoIcon(symbol);
      }

      // 3. Try 1inch token list
      if (!iconUrl) {
        iconUrl = await this.get1inchIcon(symbol, address);
      }

      if (iconUrl) {
        this.tokenCache.set(cacheKey, iconUrl);
        this.cacheTimestamps.set(cacheKey, Date.now());
        return iconUrl;
      }

    } catch (error) {
      console.warn(`Failed to fetch icon for ${symbol}:`, error);
    }

    return null;
  }

  private async getTrustWalletIcon(address: string): Promise<string | null> {
    try {
      const url = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      
      // Test if the image exists
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch (error) {
      // Ignore errors, try next service
    }
    return null;
  }

  private async getCoinGeckoIcon(symbol: string): Promise<string | null> {
    try {
      // First, search for the token
      const searchResponse = await fetch(`https://api.coingecko.com/api/v3/search?query=${symbol}`);
      if (!searchResponse.ok) throw new Error('Search failed');
      
      const searchData = await searchResponse.json();
      const coin = searchData.coins?.find((c: any) => 
        c.symbol.toLowerCase() === symbol.toLowerCase()
      );

      if (coin && coin.large && this.isValidImageUrl(coin.large)) {
        return coin.large;
      }

      // Fallback: try to get by symbol directly
      const directResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}`);
      if (directResponse.ok) {
        const coinData = await directResponse.json();
        if (coinData.image?.large && this.isValidImageUrl(coinData.image.large)) {
          return coinData.image.large;
        }
      }
    } catch (error) {
      // Ignore errors, try next service
    }
    return null;
  }

  private async get1inchIcon(symbol: string, address?: string): Promise<string | null> {
    try {
      const response = await fetch('https://tokens.1inch.io/');
      if (!response.ok) throw new Error('1inch API failed');
      
      const tokenList: TokenList = await response.json();
      
      // Try to find by address first, then by symbol
      let token = address ? tokenList.tokens.find(t => 
        t.address?.toLowerCase() === address.toLowerCase()
      ) : null;
      
      if (!token) {
        token = tokenList.tokens.find(t => 
          t.symbol.toLowerCase() === symbol.toLowerCase()
        );
      }

      if (token?.logoURI && this.isValidImageUrl(token.logoURI)) {
        return token.logoURI;
      }
    } catch (error) {
      // Ignore errors
    }
    return null;
  }

  // Method to preload popular tokens
  async preloadPopularTokens(): Promise<void> {
    const popularSymbols = ['ETH', 'BTC', 'USDC', 'USDT', 'BNB', 'CAKE', 'UNI', 'LINK'];
    
    const promises = popularSymbols.map(symbol => 
      this.getTokenIcon(symbol).catch(() => null)
    );
    
    await Promise.allSettled(promises);
  }

  // Method to clear cache
  clearCache(): void {
    this.tokenCache.clear();
    this.cacheTimestamps.clear();
  }

  // Method to get all cached icons
  getCachedIcons(): Map<string, string> {
    return new Map(this.tokenCache);
  }
}

// Export singleton instance
export const tokenService = new TokenService();
export default tokenService;