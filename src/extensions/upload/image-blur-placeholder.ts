import { Strapi } from '@strapi/strapi';
import { assign as _assign, isArray as _isArray, omit as _omit, set as _set } from 'lodash';
import plaiceholder from 'plaiceholder';

const imageBlurPlaceholder = (strapi: Strapi) => {
  strapi.contentType('plugin::upload.file').attributes.placeholder = {
    type: 'text',
  };

  strapi.plugin('upload').services.upload.uploadFileAndPersist = async function (fileData: any, { user }: any = {}) {
    const config = strapi.config.get('plugin.upload');

    const { getDimensions, generateThumbnail, generateResponsiveFormats, isSupportedImage } = strapi
      .plugin('upload')
      .service('image-manipulation');

    await strapi.plugin('upload').service('provider').upload(fileData);

    const isSupportedFileImage = await isSupportedImage(fileData);

    if (isSupportedFileImage) {
      const thumbnailFile = await generateThumbnail(fileData);

      if (thumbnailFile) {
        await strapi.plugin('upload').service('provider').upload(thumbnailFile);

        try {
          await plaiceholder.getPlaiceholder(thumbnailFile.url).then(({ base64 }: any) => {
            fileData.placeholder = base64;
          });
        } catch (e) {
          fileData.placeholder = '';
        }

        delete thumbnailFile.buffer;
        _set(fileData, 'formats.thumbnail', thumbnailFile);
      }

      const formats = await generateResponsiveFormats(fileData);

      if (_isArray(formats) && formats.length > 0) {
        formats.forEach(format => {
          if (format) {
            const { key, file } = format;
            const omitStreamProp = _omit(file, 'file.stream');

            strapi.plugin('upload').service('provider').upload(file);

            _set(fileData, ['formats', key], omitStreamProp);
          }
        });
      }

      const { width, height } = await getDimensions(fileData);

      _assign(fileData, {
        provider: config.provider,
        width,
        height,
      });
    }

    return this.add(fileData, { user });
  };
};

export default imageBlurPlaceholder;
