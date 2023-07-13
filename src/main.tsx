import React from 'react';
import ReactDOM from 'react-dom/client';
//styles
import './styles/general.css';
//providers
import { HelmetProvider } from 'react-helmet-async';
//redux
import { store } from './store/store';
import { Provider } from 'react-redux';
//view
import { Root } from './components/views/Root/Root';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <Root />
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
);
