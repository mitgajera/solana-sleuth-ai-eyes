
import { supabase } from "@/integrations/supabase/client";

export const apiKeyService = {
  /**
   * Store API key in database
   */
  saveApiKey: async (apiKey: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .upsert({
          key_name: 'messari',
          api_key: apiKey,
          user_id: '00000000-0000-0000-0000-000000000000' // Default user ID for non-authenticated storage
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving API key:', error);
      throw new Error('Failed to save API key');
    }
  },

  /**
   * Retrieve API key from database
   */
  getApiKey: async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('api_key')
        .eq('key_name', 'messari')
        .maybeSingle();

      if (error) throw error;
      return data?.api_key ?? null;
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  },

  /**
   * Check if API key exists in database
   */
  hasApiKey: async (): Promise<boolean> => {
    try {
      const apiKey = await apiKeyService.getApiKey();
      return !!apiKey;
    } catch (error) {
      console.error('Error checking API key:', error);
      return false;
    }
  },

  /**
   * Clear API key from database
   */
  clearApiKey: async (): Promise<void> => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('key_name', 'messari');
        
      if (error) throw error;
    } catch (error) {
      console.error('Error clearing API key:', error);
      throw new Error('Failed to clear API key');
    }
  }
};

