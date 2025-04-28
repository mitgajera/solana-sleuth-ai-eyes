
import { supabase } from "@/integrations/supabase/client";

export const apiKeyService = {
  /**
   * Store API key in Supabase secrets (handled by admin)
   * This function is kept for backward compatibility but doesn't store anything
   */
  saveApiKey: async (apiKey: string): Promise<void> => {
    // API key should be configured through Supabase secrets
    console.log("Note: API key is now stored in Supabase secrets");
    return Promise.resolve();
  },

  /**
   * Retrieve API key from Supabase edge function
   */
  getApiKey: async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('get-api-key', {
        method: 'GET'
      });

      if (error) throw error;
      return data?.apiKey ?? null;
    } catch (error) {
      console.error('Error retrieving API key:', error);
      return null;
    }
  },

  /**
   * Check if API key exists and is accessible
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
   * Clear API key (this is a no-op now as keys are managed via Supabase secrets)
   */
  clearApiKey: async (): Promise<void> => {
    // API key management is now handled through Supabase secrets
    console.log("Note: API key management is now handled through Supabase secrets");
    return Promise.resolve();
  }
};
