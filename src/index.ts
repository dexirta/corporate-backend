import { Strapi } from '@strapi/strapi';
import getBlogPostWithSlug from './extensions/blog-post-with-slug';

import imageBlurPlaceholder from './extensions/upload/image-blur-placeholder';

export default {
  register({ strapi }: { strapi: Strapi }) {
    imageBlurPlaceholder(strapi);
    getBlogPostWithSlug(strapi);
  },

  bootstrap({ strapi }: { strapi: Strapi }) {
    strapi.server.httpServer.keepAliveTimeout = 60 * 1000 + 1000;
    strapi.server.httpServer.headersTimeout = 60 * 1000 + 2000;
    strapi.server.httpServer.keepAlive = true;
  },
};
