import { Strapi } from '@strapi/strapi';
import getBlogPostWithSlug from './extensions/blog-post-with-slug';

import imageBlurPlaceholder from './extensions/upload/image-blur-placeholder';

export default {
  register({ strapi }: { strapi: Strapi }) {
    imageBlurPlaceholder(strapi);
    getBlogPostWithSlug(strapi);
  },
};
