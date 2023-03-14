import { config } from './config';
export default {
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
    },
  },

  upload: {
    config: {
      provider: 'strapi-provider-upload-azure-storage',
      providerOptions: {
        account: config.azure.upload.storageAccount,
        accountKey: config.azure.upload.storageAccountKey, //either account key or sas token is enough to make authentication
        // sasToken: env('STORAGE_ACCOUNT_SAS_TOKEN'),
        // serviceBaseURL: env('STORAGE_URL'), // optional
        containerName: config.azure.upload.containerName,
        defaultPath: config.azure.upload.assetsFolder,
        cdnBaseURL: config.azure.upload.cdnBaseURL, // optional
      },
    },
  },
};
