import { Strapi } from '@strapi/strapi';

const getBlogPostWithSlug = (strapi: Strapi) => {
  const extensionService = strapi.service('plugin::graphql.extension');
  extensionService?.use(({ strapi }: { strapi: Strapi }) => ({
    typeDefs: `
      type Query {
        blogPost(slug: String): BlogPostEntityResponse
      }
    `,
    resolvers: {
      Query: {
        blogPost: {
          resolve: async (parent: any, args: any, context: any) => {
            if (!strapi) {
              return null;
            }

            const { toEntityResponse }: any = strapi?.service('plugin::graphql.format')?.returnTypes;

            const data = await strapi.services['api::blog-post.blog-post'].find({
              filters: { slug: args?.slug },
            });

            const response = toEntityResponse(data.results[0]);

            return response;
          },
        },
      },
    },
  }));
};

export default getBlogPostWithSlug;
