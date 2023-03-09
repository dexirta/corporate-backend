module.exports = ({ env }: any) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  url: '/admin',
  serveAdminPanel: true,
});
