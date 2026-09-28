import {loadFont} from '@remotion/fonts';
import {continueRender, delayRender, staticFile} from 'remotion';

export const DISPLAY = '"Plus Jakarta Sans", sans-serif';
export const BODY = '"Inter", sans-serif';

const faces: Array<[string, string, string]> = [
  ['Plus Jakarta Sans', '500', 'plus-jakarta-sans-latin-500-normal.woff2'],
  ['Plus Jakarta Sans', '600', 'plus-jakarta-sans-latin-600-normal.woff2'],
  ['Plus Jakarta Sans', '700', 'plus-jakarta-sans-latin-700-normal.woff2'],
  ['Plus Jakarta Sans', '800', 'plus-jakarta-sans-latin-800-normal.woff2'],
  ['Inter', '400', 'inter-latin-400-normal.woff2'],
  ['Inter', '500', 'inter-latin-500-normal.woff2'],
  ['Inter', '600', 'inter-latin-600-normal.woff2'],
];

const handle = delayRender('Loading fonts');
Promise.all(
  faces.map(([family, weight, file]) =>
    loadFont({family, weight, url: staticFile(`fonts/${file}`)}),
  ),
).then(() => continueRender(handle));
