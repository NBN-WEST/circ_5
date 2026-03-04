import React, { useState, useCallback } from 'react';
import { Circle } from './Circle';
import { KeyInfo } from './KeyInfo';
import { CIRCLE_OF_FIFTHS_KEYS, MusicalKey } from '../../data/keys';
import { useAudio } from '../../hooks/useAudio';
import { generateChord } from '../../audio/chords';

export const CircleOfFifths: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<MusicalKey | null>(null);
  const { playNote, playChord, initializeAudio } = useAudio();

  const handleKeySelect = useCallback(async (key: MusicalKey) => {
    await initializeAudio();
    setSelectedKey(key);

    const rootNote = key.name.replace('#', '#').replace('b', 'b').split('/')[0];
    const chord = generateChord(rootNote, 'major', 4);
    playChord(chord);
  }, [initializeAudio, playChord]);

  const handlePlayNote = useCallback(async (note: string) => {
    await initializeAudio();
    playNote(note);
  }, [initializeAudio, playNote]);

  const handlePlayChord = useCallback(async (notes: string[]) => {
    await initializeAudio();
    playChord(notes);
  }, [initializeAudio, playChord]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Circolo delle Quinte
        </h1>
        <p className="text-white/70 text-lg">
          Esplora le tonalita', scale e accordi della musica
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="card">
          <Circle
            keys={CIRCLE_OF_FIFTHS_KEYS}
            selectedKey={selectedKey}
            onKeySelect={handleKeySelect}
          />
        </div>

        <div>
          {selectedKey ? (
            <KeyInfo
              selectedKey={selectedKey}
              onPlayNote={handlePlayNote}
              onPlayChord={handlePlayChord}
            />
          ) : (
            <div className="card text-center py-12">
              <p className="text-white/60 text-xl">
                Seleziona una tonalita' dal circolo per visualizzare i dettagli
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
