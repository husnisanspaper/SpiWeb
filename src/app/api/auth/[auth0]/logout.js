// pages/api/auth/logout.js
import { handleLogout } from '@auth0/nextjs-auth0';

export default async function logout(req, res) {

    console.log('masuk logout sini tak???')
  try {
    await handleLogout(req, res, {
      returnTo: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000'
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
