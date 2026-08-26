import type { ReactNode } from 'react';
import config from '@payload-config';
import '@payloadcms/next/css';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import { importMap } from './admin/importMap';
import './custom.scss';

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

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
