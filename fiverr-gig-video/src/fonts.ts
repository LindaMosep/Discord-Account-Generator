import {loadFont} from '@remotion/fonts';
import {continueRender, delayRender, staticFile} from 'remotion';

export const DISPLAY = '"Bricolage Grotesque", sans-serif';
export const SERIF = '"Instrument Serif", serif';
export const BODY = '"Inter", sans-serif';
export const MONO = '"JetBrains Mono", monospace';

const faces: Array<[string, string, string, string?]> = [
  ['Bricolage Grotesque', '500', 'bricolage-grotesque-latin-500-normal.woff2'],
  ['Bricolage Grotesque', '600', 'bricolage-grotesque-latin-600-normal.woff2'],
  ['Bricolage Grotesque', '700', 'bricolage-grotesque-latin-700-normal.woff2'],
  ['Bricolage Grotesque', '800', 'bricolage-grotesque-latin-800-normal.woff2'],
  ['Instrument Serif', '400', 'instrument-serif-latin-400-italic.woff2', 'italic'],
  ['Inter', '400', 'inter-latin-400-normal.woff2'],
  ['Inter', '500', 'inter-latin-500-normal.woff2'],
  ['Inter', '600', 'inter-latin-600-normal.woff2'],
  ['JetBrains Mono', '500', 'jetbrains-mono-latin-500-normal.woff2'],
  ['JetBrains Mono', '700', 'jetbrains-mono-latin-700-normal.woff2'],
];

const handle = delayRender('Loading fonts');
Promise.all(
  faces.map(([family, weight, file, style]) =>
    loadFont({family, weight, style: style ?? 'normal', url: staticFile(`fonts/${file}`)}),
  ),
).then(() => continueRender(handle));
