
/**
 * API Key Service
 * 
 * This service handles storing and retrieving the Messari API key from local storage
 * In a production environment, you would want to store this server-side in a database
 */

const API_KEY_STORAGE_KEY = 'MESSARI_API_KEY';

export const apiKeyService = {
  /**
   * Store API key in local storage
   */
  saveApiKey: (apiKey: string): void => {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
  },

  /**
   * Retrieve API key from local storage
   */
  getApiKey: (): string | null => {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  },

  /**
   * Check if API key exists in local storage
   */
  hasApiKey: (): boolean => {
    return !!localStorage.getItem(API_KEY_STORAGE_KEY);
  },

  /**
   * Clear API key from local storage
   */
  clearApiKey: (): void => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
};
