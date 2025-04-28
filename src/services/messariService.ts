
import { supabase } from "@/integrations/supabase/client";
import { apiKeyService } from "./apiKeyService";

export type SolanaAssetData = {
  marketData?: {
    price_usd: number;
    percent_change_24h: number;
    volume_last_24_hours: number;
  };
  marketCap?: number;
  txVolume?: number;
  activeAddresses?: number;
};

export type SolanaNewsItem = {
  id: string;
  title: string;
  content: string;
  published_at: string;
  author: {
    name: string;
  };
  url: string;
  references: any[];
};

export const messariService = {
  /**
   * Fetch Solana transaction data from Messari API
   */
  getSolanaTransactions: async (): Promise<any> => {
    try {
      const { data, error } = await supabase.functions.invoke('get-solana-data', {
        method: 'GET',
        query: { type: 'transactions' }
      });

      if (error) {
        console.error('Error fetching Solana transactions:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getSolanaTransactions:', error);
      throw error;
    }
  },

  /**
   * Fetch Solana news from Messari API
   */
  getSolanaNews: async (): Promise<any> => {
    try {
      const { data, error } = await supabase.functions.invoke('get-solana-data', {
        method: 'GET',
        query: { type: 'news' }
      });

      if (error) {
        console.error('Error fetching Solana news:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getSolanaNews:', error);
      throw error;
    }
  },

  /**
   * Fetch Solana asset data from Messari API
   */
  getSolanaAssetData: async (): Promise<any> => {
    try {
      const { data, error } = await supabase.functions.invoke('get-solana-data', {
        method: 'GET',
        query: { type: 'assets' }
      });

      if (error) {
        console.error('Error fetching Solana asset data:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in getSolanaAssetData:', error);
      throw error;
    }
  },

  /**
   * Transform raw Messari data into a format the app can use
   */
  transformSolanaData: (rawData: any): SolanaAssetData => {
    try {
      if (!rawData || !rawData.data || !rawData.data.market_data) {
        throw new Error('Invalid data format from Messari API');
      }

      const marketData = rawData.data.market_data;
      
      return {
        marketData: {
          price_usd: marketData.price_usd || 0,
          percent_change_24h: marketData.percent_change_24h || 0,
          volume_last_24_hours: marketData.volume_last_24_hours || 0,
        },
        marketCap: rawData.data.marketcap?.current_marketcap_usd || 0,
        txVolume: rawData.data.transaction_volume?.volume_last_24_hours || 0,
        activeAddresses: rawData.data.active_addresses || 0,
      };
    } catch (error) {
      console.error('Error transforming Solana data:', error);
      return {};
    }
  },

  /**
   * Transform raw news data into a format the app can use
   */
  transformNewsData: (rawData: any): SolanaNewsItem[] => {
    try {
      if (!rawData || !rawData.data || !Array.isArray(rawData.data)) {
        return [];
      }

      return rawData.data
        .filter((item: any) => item.title.toLowerCase().includes('solana') || 
                              (item.content && item.content.toLowerCase().includes('solana')))
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          published_at: item.published_at,
          author: {
            name: item.author?.name || 'Unknown'
          },
          url: item.url,
          references: item.references || []
        }));
    } catch (error) {
      console.error('Error transforming news data:', error);
      return [];
    }
  }
};
