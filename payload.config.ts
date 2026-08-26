import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';
import { Pages } from './collections/Pages';
import { Services } from './collections/Services';
import { BlogPosts } from './collections/BlogPosts';
import { Testimonials } from './collections/Testimonials';
import { Media } from './collections/Media';
import { SiteSettings } from './globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Pages, Services, BlogPosts, Testimonials, Media],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'techcentera_secret_payload_key_998877',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
