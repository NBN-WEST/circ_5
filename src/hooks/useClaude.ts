import { useState, useCallback } from 'react';
import { apiRateLimiter, validateApiKey } from '../utils/security';

interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export function useClaude() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askClaude = useCallback(async (
    question: string,
    apiKey: string
  ): Promise<string> => {
    if (!validateApiKey(apiKey)) {
      throw new Error('API Key non valida');
    }

    if (!apiRateLimiter.canMakeRequest()) {
      throw new Error('Limite richieste raggiunto. Riprova tra un minuto.');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Sei un esperto di teoria musicale. Rispondi in italiano. ${question}`
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Errore API: ${response.status}`);
      }

      const data: ClaudeResponse = await response.json();
      const textContent = data.content.find(c => c.type === 'text');

      return textContent?.text || 'Nessuna risposta disponibile';
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Errore sconosciuto';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { askClaude, loading, error };
}
