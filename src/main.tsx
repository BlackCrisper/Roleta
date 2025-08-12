
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as serviceWorker from './utils/serviceWorker'

createRoot(document.getElementById("root")!).render(<App />);

// Registra o service worker para funcionalidade offline
// serviceWorker.register();
