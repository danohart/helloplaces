// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists
import 'dotenv/config';

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { createAuth } from '@keystone-6/auth';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  checkbox,
} from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields
 
// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
});

export const lists: Lists = {
  User: list({
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      isAdmin: checkbox(),

      password: password({ validation: { isRequired: true } }),

      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
    access: {
      operation: {
        query: ({ session, context, listKey, operation }) => true,
        create: ({ session, context, listKey, operation }) => true,
        update: ({ session, context, listKey, operation }) => false,
        delete: ({ session, context, listKey, operation }) => false,
      },
      filter: {
        update: ({ session, context, listKey, operation }) => {
          return { isAdmin: { equals: true } };
        },
        delete: ({ session, context, listKey, operation }) => {
          return { isAdmin: { equals: true } };
        },
    },
  }}),

  Place: list({
    fields: {
      featured: checkbox(),
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      address: text({
        validation: { isRequired: true },
      }),
      website: text(),
      neighborhood: relationship({ ref: 'PlaceNeighborhood' }),
      image: cloudinaryImage({
        cloudinary: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.CLOUDINARY_API_KEY,
          apiSecret: process.env.CLOUDINARY_API_SECRET,
          folder: process.env.CLOUDINARY_API_FOLDER,
        },
      }),
      description: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      mainCategory: relationship({ ref: 'PlaceCategory' }),
      subCategory: relationship({ ref: 'PlaceCategory' }),
      time: relationship({ ref: 'PlaceTime', many: true, }),
      details: relationship({ ref: 'PlaceDetail', many: true, }),
    },
    access: {
      operation: {
        query: ({ session, context, listKey, operation }) => true,
        create: ({ session, context, listKey, operation }) => true,
        update: ({ session, context, listKey, operation }) => true,
        delete: ({ session, context, listKey, operation }) => true,
      },
    },
  }),

  PlaceTime: list({
    fields: {
      day: select({
        type: 'string',
        options: [
          { label: 'Sunday', value: 'Sunday' },
          { label: 'Monday', value: 'Monday' },
          { label: 'Tuesday', value: 'Tuesday' },
          { label: 'Wednesday', value: 'Wednesday' },
          { label: 'Thursday', value: 'Thursday' },
          { label: 'Friday', value: 'Friday' },
          { label: 'Saturday', value: 'Saturday' },
        ],
        defaultValue: "Sunday",
        ui: { displayMode: 'select' },
      }),
      time: text(),
    },
    ui: {
      isHidden: true,
    },
    access: {
      operation: {
        query: ({ session, context, listKey, operation }) => true,
        create: ({ session, context, listKey, operation }) => true,
        update: ({ session, context, listKey, operation }) => true,
        delete: ({ session, context, listKey, operation }) => false,
      },
    },
  }),

  PlaceNeighborhood: list({
    fields: {
      name: text({
        isIndexed: 'unique',
      }),
    },
    ui: {
      isHidden: true,
    },
    access: {
      operation: {
        query: ({ session, context, listKey, operation }) => true,
        create: ({ session, context, listKey, operation }) => true,
        update: ({ session, context, listKey, operation }) => true,
        delete: ({ session, context, listKey, operation }) => false,
      },
    },
  }),

  PlaceDetail: list({
    fields: {
      name: text({
        isIndexed: 'unique',
      }),
    },
    ui: {
      isHidden: true,
    },
    access: {
      operation: {
        query: ({ session, context, listKey, operation }) => true,
        create: ({ session, context, listKey, operation }) => true,
        update: ({ session, context, listKey, operation }) => true,
        delete: ({ session, context, listKey, operation }) => false,
      },
    },
  }),

  PlaceCategory: list({
    fields: {
      name: text({
        isIndexed: 'unique',
      }),
    },
    ui: {
      isHidden: true,
    },
    access: {
      operation: {
        query: ({ session, context, listKey, operation }) => true,
        create: ({ session, context, listKey, operation }) => true,
        update: ({ session, context, listKey, operation }) => true,
        delete: ({ session, context, listKey, operation }) => false,
      },
    },
  }),
};
