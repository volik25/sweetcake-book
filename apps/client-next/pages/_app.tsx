import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '@web/_contexts/AuthContext';
import { AdminPanel } from '@web/layout/AdminPanel/AdminPanel';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <AdminPanel />
    </AuthContextProvider>
  );
}
