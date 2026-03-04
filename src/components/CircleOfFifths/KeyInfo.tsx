import React from 'react';
import { MusicalKey, getAlterationsDescription } from '../../data/keys';
import { Music, Volume2 } from 'lucide-react';

interface KeyInfoProps {
  selectedKey: MusicalKey;
  onPlayNote: (note: string) => void;
  onPlayChord: (notes: string[]) => void;
}

export const KeyInfo: React.FC<KeyInfoProps> = ({
  selectedKey,
  onPlayNote,
  onPlayChord: _onPlayChord,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-yellow-300 mb-2">
          {selectedKey.major}
        </h2>
        <div className="h-1 w-20 bg-yellow-300 rounded"></div>
      </div>

      <div className="card bg-gradient-to-br from-blue-600/30 to-blue-800/30 border border-blue-400/30">
        <div className="flex items-center gap-2 mb-3">
          <Music className="w-5 h-5 text-blue-300" />
          <h3 className="text-lg font-semibold text-blue-200">Scala Maggiore</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedKey.majorScale.map((note, idx) => {
            const isAltered = selectedKey.alterations.includes(note);

            return (
              <button
                key={`major-${idx}`}
                onClick={() => onPlayNote(`${note.replace('#', '#').replace('b', 'b')}4`)}
                className={`group relative px-4 py-2 rounded-lg font-bold text-lg transition-all ${
                  isAltered
                    ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {note}
                <Volume2 className="absolute -top-1 -right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            const notes = selectedKey.majorScale.map(
              n => `${n.replace('#', '#').replace('b', 'b')}4`
            );
            notes.forEach((note, idx) => {
              setTimeout(() => onPlayNote(note), idx * 300);
            });
          }}
          className="mt-3 btn-primary w-full flex items-center justify-center gap-2"
        >
          <Volume2 className="w-4 h-4" />
          Suona Scala
        </button>
      </div>

      <div className="card bg-gradient-to-br from-purple-600/30 to-purple-800/30 border border-purple-400/30">
        <div className="flex items-center gap-2 mb-3">
          <Music className="w-5 h-5 text-purple-300" />
          <h3 className="text-lg font-semibold text-purple-200">
            Scala Minore Relativa
          </h3>
        </div>

        <p className="text-white/80 text-sm mb-3">{selectedKey.minor}</p>

        <div className="flex flex-wrap gap-2">
          {selectedKey.minorScale.map((note, idx) => {
            const isAltered = selectedKey.alterations.includes(note);

            return (
              <button
                key={`minor-${idx}`}
                onClick={() => onPlayNote(`${note.replace('#', '#').replace('b', 'b')}4`)}
                className={`group relative px-4 py-2 rounded-lg font-bold text-lg transition-all ${
                  isAltered
                    ? 'bg-orange-500 text-gray-900 hover:bg-orange-400'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {note}
                <Volume2 className="absolute -top-1 -right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="card bg-gradient-to-br from-green-600/30 to-green-800/30 border border-green-400/30">
        <h3 className="text-lg font-semibold text-green-200 mb-3">
          Alterazioni in Chiave
        </h3>

        <p className="text-white text-xl mb-3">
          {getAlterationsDescription(selectedKey)}
        </p>

        {selectedKey.alterations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedKey.alterations.map((alt, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-bold text-lg"
              >
                {alt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
