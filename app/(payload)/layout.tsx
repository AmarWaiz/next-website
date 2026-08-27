import type { CSSProperties, ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import config from '@payload-config';
import '@payloadcms/next/css';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import { importMap } from './admin/importMap';
import './custom.scss';

// Same typefaces as the marketing site (app/(frontend)/layout.tsx)
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono-brand',
  subsets: ['latin'],
  display: 'swap',
});

type Args = {
  children: ReactNode;
};

const serverFunction = async function (args: any) {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

// Payload renders <html>/<body> itself, so the font variables are applied to a
// `display: contents` wrapper and inherited by the whole admin tree.
const fontVars = {
  display: 'contents',
  '--font-body': 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '--font-mono': 'var(--font-mono-brand), monospace',
} as CSSProperties;

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <div className={`${inter.variable} ${jetbrainsMono.variable}`} style={fontVars}>
      {children}
    </div>
  </RootLayout>
);

export default Layout;
