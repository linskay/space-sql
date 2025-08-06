import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

console.log('Application starting...');

const container = document.getElementById('root');

if (!container) {
  console.error('Failed to find the root element');
  throw new Error('Root element not found');
}

console.log('Root element found, creating root...');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
