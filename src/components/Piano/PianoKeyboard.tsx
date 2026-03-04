import React, { useState, useCallback, useEffect } from 'react';
import { getPianoEngine } from '../../audio/piano';
import { WhiteKey } from './WhiteKey';
import { BlackKey } from './BlackKey';

interface PianoKey {
  note: string;
  octave: number;
  isBlack: boolean;
}

const OCTAVE_NOTES = [
  { note: 'C', isBlack: false },
  { note: 'C#', isBlack: true },
  { note: 'D', isBlack: false },
  { note: 'D#', isBlack: true },
  { note: 'E', isBlack: false },
  { note: 'F', isBlack: false },
  { note: 'F#', isBlack: true },
  { note: 'G', isBlack: false },
  { note: 'G#', isBlack: true },
  { note: 'A', isBlack: false },
  { note: 'A#', isBlack: true },
  { note: 'B', isBlack: false },
];

export const PianoKeyboard: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [pianoInitialized, setPianoInitialized] = useState(false);
  const [pianoLoading, setPianoLoading] = useState(false);

  const piano = getPianoEngine();

  useEffect(() => {
    const initPiano = async () => {
      if (!pianoInitialized && !pianoLoading) {
        setPianoLoading(true);
        try {
          await piano.initialize();
          setPianoInitialized(true);
        } catch (error) {
          console.error('Errore inizializzazione piano:', error);
        } finally {
          setPianoLoading(false);
        }
      }
    };

    initPiano();
  }, [piano, pianoInitialized, pianoLoading]);

  const handleKeyDown = useCallback(
    (note: string, octave: number) => {
      if (!pianoInitialized) return;

      const fullNote = `${note}${octave}`;
      piano.playKey(fullNote, 0.8);
      setActiveKeys((prev) => new Set(prev).add(fullNote));
    },
    [piano, pianoInitialized]
  );

  const handleKeyUp = useCallback(
    (note: string, octave: number) => {
      if (!pianoInitialized) return;

      const fullNote = `${note}${octave}`;
      piano.releaseKey(fullNote);
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(fullNote);
        return next;
      });
    },
    [piano, pianoInitialized]
  );

  const keys: PianoKey[] = [];
  for (let octave = 4; octave <= 5; octave++) {
    OCTAVE_NOTES.forEach(({ note, isBlack }) => {
      keys.push({ note, octave, isBlack });
    });
  }

  const whiteKeys = keys.filter((k) => !k.isBlack);
  const blackKeys = keys.filter((k) => k.isBlack);

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        Pianoforte Virtuale
        {pianoLoading && (
          <span className="text-sm text-yellow-300">(Caricamento...)</span>
        )}
      </h3>

      <div className="relative w-full h-64 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl p-4">
        <div className="relative h-full flex">
          {whiteKeys.map((key, idx) => {
            const fullNote = `${key.note}${key.octave}`;
            const isActive = activeKeys.has(fullNote);

            return (
              <WhiteKey
                key={fullNote}
                note={key.note}
                octave={key.octave}
                isActive={isActive}
                onKeyDown={() => handleKeyDown(key.note, key.octave)}
                onKeyUp={() => handleKeyUp(key.note, key.octave)}
                isLast={idx === whiteKeys.length - 1}
              />
            );
          })}

          {blackKeys.map((key) => {
            const fullNote = `${key.note}${key.octave}`;
            const isActive = activeKeys.has(fullNote);

            const whiteKeyIndex = whiteKeys.findIndex(
              (wk) =>
                wk.octave === key.octave &&
                OCTAVE_NOTES.findIndex((n) => n.note === wk.note) <
                  OCTAVE_NOTES.findIndex((n) => n.note === key.note)
            );

            const totalWhiteKeys = whiteKeys.length;
            const leftPercent =
              ((whiteKeyIndex + 1.6) / totalWhiteKeys) * 100;

            return (
              <BlackKey
                key={fullNote}
                note={key.note}
                octave={key.octave}
                isActive={isActive}
                onKeyDown={() => handleKeyDown(key.note, key.octave)}
                onKeyUp={() => handleKeyUp(key.note, key.octave)}
                leftPercent={leftPercent}
                widthPercent={(100 / totalWhiteKeys) * 0.6}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-sm text-white/70 text-center">
        Clicca sui tasti per suonare - Supporto touch per dispositivi mobili
      </div>
    </div>
  );
};
