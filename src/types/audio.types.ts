export interface AudioState {
  initialized: boolean;
  playing: boolean;
  volume: number;
  currentNote: string | null;
}

export interface PianoState {
  activeKeys: Set<string>;
  octaveRange: [number, number];
  sustainPedal: boolean;
}
