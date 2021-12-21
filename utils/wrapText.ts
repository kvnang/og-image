import type { CanvasRenderingContext2D } from 'skia-canvas';

export interface TextProps {
  ctx: CanvasRenderingContext2D;
  text: string;
  font: string;
  x: number;
  y: number;
  maxWidth: number;
  maxHeight: number;
  lineHeight: number;
}

export default function wrapText({
  ctx,
  text,
  font,
  x,
  y: _y,
  maxWidth,
  maxHeight,
  lineHeight,
}: TextProps) {
  const words = text.split(' ');
  let line = '';
  let lineMinusOneWord = '';
  let lineCount = 1;
  let i;
  let test;
  let metrics;
  let y = _y;

  const maxLines = Math.floor(maxHeight / lineHeight);

  for (i = 0; i < words.length; i += 1) {
    test = words[i];
    metrics = ctx.measureText(test);
    while (metrics.width > maxWidth) {
      // Determine how much of the word will fit
      test = test.substring(0, test.length - 1);
      metrics = ctx.measureText(test);
    }
    if (words[i] !== test) {
      words.splice(i + 1, 0, words[i].substring(test.length));
      words[i] = test;
    }

    test = `${line + words[i]} `;
    metrics = ctx.measureText(test);

    if (metrics.width > maxWidth && i > 0) {
      lineCount += 1;

      if (lineCount > maxLines) {
        lineCount -= 1; // For returning the existing line count
        line = lineMinusOneWord;
        ctx.fillText(`${line}...`, x, y);
        break;
      } else {
        ctx.fillText(line, x, y);
      }

      line = `${words[i]} `;
      y += lineHeight;
    } else {
      lineMinusOneWord = `${line} `;
      line = test;
    }
  }

  ctx.fillText(line, x, y);

  return { lineCount };
}
