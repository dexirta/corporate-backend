module.exports = ({ env }: any) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://taxually-corporate-backend.azurewebsites.net',
});
