import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  selectedKey: string | null;
  volume: number;
  octave: number;
  claudeApiKey: string | null;
  claudeEnabled: boolean;

  setSelectedKey: (key: string | null) => void;
  setVolume: (volume: number) => void;
  setOctave: (octave: number) => void;
  setClaudeApiKey: (key: string | null) => void;
  setClaudeEnabled: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedKey: null,
      volume: -10,
      octave: 4,
      claudeApiKey: null,
      claudeEnabled: false,

      setSelectedKey: (key) => set({ selectedKey: key }),
      setVolume: (volume) => set({ volume }),
      setOctave: (octave) => set({ octave }),
      setClaudeApiKey: (key) => set({ claudeApiKey: key }),
      setClaudeEnabled: (enabled) => set({ claudeEnabled: enabled })
    }),
    {
      name: 'circolo-quinte-storage',
      partialize: (state) => ({
        selectedKey: state.selectedKey,
        volume: state.volume,
        octave: state.octave,
        claudeEnabled: state.claudeEnabled
      })
    }
  )
);

export async function initializeStore() {
  if (typeof window !== 'undefined' && 'electronAPI' in window) {
    const electronAPI = (window as any).electronAPI;
    const savedKey = await electronAPI.store.get('claude_api_key');
    if (savedKey) {
      useAppStore.setState({ claudeApiKey: savedKey });
    }
  }
}
