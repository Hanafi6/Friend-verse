'use client';

import './globals.css';
import NavBar from './Commponents/NavBar';
import QueryProvider from './provider/QueryProvider';
import { useAuth, useTheme } from './store/manegState';
import { useEffect } from 'react';
import { useFrindStore } from './store/FrindSlice';
import { useSyncUser } from '../../customHooks/useSyncUser ';

function InnerApp({ children }) {
  const { isAuthnticated, User } = useAuth();
  const theme = useTheme((state) => state.theme);
  const { setFrinds } = useFrindStore();

  useSyncUser(); // ✅ تحديث اليوزر تلقائي

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      {isAuthnticated && <NavBar />}
      {children}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <InnerApp>{children}</InnerApp>
        </QueryProvider>
      </body>
    </html>
  );
}
