import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '.';

describe('App', () => {
    it('renders without crashing', () => {
        const container = document.createElement('div');
        const root = createRoot(container);
        root.render(<App />);
        root.unmount();
    });
});
