"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config2 = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_config = require("dotenv/config");
var import_core = require("@keystone-6/core");
var import_auth = require("@keystone-6/auth");
var import_fields = require("@keystone-6/core/fields");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_fields_document = require("@keystone-6/fields-document");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password"
});
var lists = {
  User: (0, import_core.list)({
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      isAdmin: (0, import_fields.checkbox)(),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    },
    access: {
      operation: {
        query: ({ session: session2, context, listKey, operation }) => true,
        create: ({ session: session2, context, listKey, operation }) => true,
        update: ({ session: session2, context, listKey, operation }) => false,
        delete: ({ session: session2, context, listKey, operation }) => false
      },
      filter: {
        update: ({ session: session2, context, listKey, operation }) => {
          return { isAdmin: { equals: true } };
        },
        delete: ({ session: session2, context, listKey, operation }) => {
          return { isAdmin: { equals: true } };
        }
      }
    }
  }),
  Place: (0, import_core.list)({
    fields: {
      featured: (0, import_fields.checkbox)(),
      name: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      address: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      website: (0, import_fields.text)(),
      neighborhood: (0, import_fields.relationship)({ ref: "PlaceNeighborhood" }),
      image: (0, import_cloudinary.cloudinaryImage)({
        cloudinary: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.CLOUDINARY_API_KEY,
          apiSecret: process.env.CLOUDINARY_API_SECRET,
          folder: process.env.CLOUDINARY_API_FOLDER
        }
      }),
      description: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      mainCategory: (0, import_fields.relationship)({ ref: "PlaceCategory" }),
      subCategory: (0, import_fields.relationship)({ ref: "PlaceCategory" }),
      time: (0, import_fields.relationship)({ ref: "PlaceTime", many: true }),
      details: (0, import_fields.relationship)({ ref: "PlaceDetail", many: true })
    },
    access: {
      operation: {
        query: ({ session: session2, context, listKey, operation }) => true,
        create: ({ session: session2, context, listKey, operation }) => true,
        update: ({ session: session2, context, listKey, operation }) => true,
        delete: ({ session: session2, context, listKey, operation }) => true
      }
    }
  }),
  PlaceTime: (0, import_core.list)({
    fields: {
      day: (0, import_fields.select)({
        type: "string",
        options: [
          { label: "Sunday", value: "Sunday" },
          { label: "Monday", value: "Monday" },
          { label: "Tuesday", value: "Tuesday" },
          { label: "Wednesday", value: "Wednesday" },
          { label: "Thursday", value: "Thursday" },
          { label: "Friday", value: "Friday" },
          { label: "Saturday", value: "Saturday" }
        ],
        defaultValue: "Sunday",
        ui: { displayMode: "select" }
      }),
      time: (0, import_fields.text)()
    },
    ui: {
      isHidden: true
    },
    access: {
      operation: {
        query: ({ session: session2, context, listKey, operation }) => true,
        create: ({ session: session2, context, listKey, operation }) => true,
        update: ({ session: session2, context, listKey, operation }) => true,
        delete: ({ session: session2, context, listKey, operation }) => false
      }
    }
  }),
  PlaceNeighborhood: (0, import_core.list)({
    fields: {
      name: (0, import_fields.text)({
        isIndexed: "unique"
      })
    },
    ui: {
      isHidden: true
    },
    access: {
      operation: {
        query: ({ session: session2, context, listKey, operation }) => true,
        create: ({ session: session2, context, listKey, operation }) => true,
        update: ({ session: session2, context, listKey, operation }) => true,
        delete: ({ session: session2, context, listKey, operation }) => false
      }
    }
  }),
  PlaceDetail: (0, import_core.list)({
    fields: {
      name: (0, import_fields.text)({
        isIndexed: "unique"
      })
    },
    ui: {
      isHidden: true
    },
    access: {
      operation: {
        query: ({ session: session2, context, listKey, operation }) => true,
        create: ({ session: session2, context, listKey, operation }) => true,
        update: ({ session: session2, context, listKey, operation }) => true,
        delete: ({ session: session2, context, listKey, operation }) => false
      }
    }
  }),
  PlaceCategory: (0, import_core.list)({
    fields: {
      name: (0, import_fields.text)({
        isIndexed: "unique"
      })
    },
    ui: {
      isHidden: true
    },
    access: {
      operation: {
        query: ({ session: session2, context, listKey, operation }) => true,
        create: ({ session: session2, context, listKey, operation }) => true,
        update: ({ session: session2, context, listKey, operation }) => true,
        delete: ({ session: session2, context, listKey, operation }) => false
      }
    }
  }),
  FavoritesList: (0, import_core.list)({
    fields: {
      url: (0, import_fields.text)({
        isIndexed: "unique"
      }),
      places: (0, import_fields.relationship)({ ref: "Place", many: true })
    },
    access: {
      operation: {
        query: ({ session: session2, context, listKey, operation }) => true,
        create: ({ session: session2, context, listKey, operation }) => true,
        update: ({ session: session2, context, listKey, operation }) => true,
        delete: ({ session: session2, context, listKey, operation }) => false
      }
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth2 = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth: withAuth2 } = (0, import_auth2.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth2(
  (0, import_core2.config)({
    db: {
      provider: "postgresql",
      url: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@hellochicago.cewjmaz24xtz.us-east-2.rds.amazonaws.com/postgres`,
      onConnect: async (context) => {
      },
      // Optional advanced configuration
      enableLogging: true,
      idField: { kind: "uuid" }
    },
    server: {
      port: 7777,
      cors: {
        origin: ["http://localhost:3001", "https://www.hellochicago.co", "https://www.hellologansquare.com"]
      }
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
