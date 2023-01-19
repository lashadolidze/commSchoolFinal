import { redirect } from 'react-router-dom';
import { parseJwt } from '../jwt/Jwt.js';

export const protectedPagesLoader = () => {
  const token = localStorage.getItem('authToken');
  const { exp } = parseJwt(token);

  const now = Date.now() / 1000;

  if (!exp || exp < now) {
    return redirect('/');
  }

  return null;
};