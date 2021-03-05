import { src, dest } from '../src';
import path from 'path';

// node esm issue
const __dirname = path.dirname('./');

src(`${path.resolve(__dirname, '__demo__/src')}/**/*`).pipe(
  dest(path.resolve(__dirname, '__demo__/dist'))
);
