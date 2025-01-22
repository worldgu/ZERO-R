import * as React from 'react';
import ThemeRegistry from './theme-registry';
import Navigation from '../components/Navigation';
import QueryProvider from '../components/QueryProvider';

export const metadata = {
  title: 'Personal Website',
  description: 'A modern personal website built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <QueryProvider>
            <Navigation />
            {children}
          </QueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}