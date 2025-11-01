import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ArticleProvider } from './contexts/ArticleContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { PageContentProvider } from './contexts/PageContentContext';
import { FileProvider } from './contexts/FileContext';
import { SettingsProvider } from './contexts/SettingsContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <SettingsProvider>
          <CategoryProvider>
            <ArticleProvider>
              <PageContentProvider>
                <FileProvider>
                  <App />
                </FileProvider>
              </PageContentProvider>
            </ArticleProvider>
          </CategoryProvider>
        </SettingsProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);