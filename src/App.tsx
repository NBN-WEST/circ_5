import { useEffect } from 'react';
import { CircleOfFifths } from './components/CircleOfFifths/CircleOfFifths';
import { PianoKeyboard } from './components/Piano/PianoKeyboard';
import { initializeStore } from './store/appStore';

function App() {
  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <div className="min-h-screen">
      <CircleOfFifths />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <PianoKeyboard />
      </div>
    </div>
  );
}

export default App;
