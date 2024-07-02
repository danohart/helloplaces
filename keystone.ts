// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import 'dotenv/config';

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: `${process.env.DATABASE_URL_NON_POOLING}`,
      onConnect: async context => { /* ... */ },
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: 'uuid' }
    },
    server: {
      port: 7777,
      cors: { 
        origin: ['http://localhost:3001', 'https://www.hellochicago.co', 'https://www.hellologansquare.com', 'https://hellologansquare.vercel.app'],
      },
    },
    lists,
    session,
  })
);
