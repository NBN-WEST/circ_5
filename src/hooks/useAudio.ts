import { useState, useCallback } from 'react';
import { getAudioEngine } from '../audio/synthesizer';
import { getPianoEngine } from '../audio/piano';

export function useAudio() {
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [pianoInitialized, setPianoInitialized] = useState(false);
  const [volume, setVolume] = useState(-10);
  const [loading, setLoading] = useState(false);

  const audioEngine = getAudioEngine();
  const pianoEngine = getPianoEngine();

  const initializeAudio = useCallback(async () => {
    if (audioInitialized) return;

    setLoading(true);
    try {
      await audioEngine.initialize();
      setAudioInitialized(true);
    } catch (error) {
      console.error('Errore inizializzazione audio:', error);
    } finally {
      setLoading(false);
    }
  }, [audioEngine, audioInitialized]);

  const initializePiano = useCallback(async () => {
    if (pianoInitialized) return;

    setLoading(true);
    try {
      await pianoEngine.initialize();
      setPianoInitialized(true);
    } catch (error) {
      console.error('Errore inizializzazione piano:', error);
    } finally {
      setLoading(false);
    }
  }, [pianoEngine, pianoInitialized]);

  const playNote = useCallback(async (note: string, duration: string = '8n') => {
    await initializeAudio();
    audioEngine.playNote(note, duration);
  }, [audioEngine, initializeAudio]);

  const playChord = useCallback(async (notes: string[], duration: string = '2n') => {
    await initializeAudio();
    audioEngine.playChord(notes, duration);
  }, [audioEngine, initializeAudio]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    audioEngine.setVolume(newVolume);
    pianoEngine.setVolume(newVolume);
  }, [audioEngine, pianoEngine]);

  const stopAll = useCallback(() => {
    audioEngine.stopAll();
    pianoEngine.stopAll();
  }, [audioEngine, pianoEngine]);

  return {
    audioInitialized,
    pianoInitialized,
    loading,
    volume,
    playNote,
    playChord,
    changeVolume,
    stopAll,
    initializeAudio,
    initializePiano
  };
}
