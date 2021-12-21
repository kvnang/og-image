import {
  FontLibrary,
  loadImage,
  Canvas,
  CanvasRenderingContext2D,
} from 'skia-canvas';
import path from 'path';
import cover from '../utils/cover';
import { cleanObject, getBaseUrl } from '../utils/helpers';
import wrapText, { TextProps } from '../utils/wrapText';

interface DrawTextProps extends TextProps {
  type?: string;
}

const isBrowser = typeof window !== 'undefined';
const baseUrl = getBaseUrl();

let passedConfig = {};

function setConfig(conf?: {}) {
  if (!conf) {
    return;
  }

  passedConfig = cleanObject(conf);
}

export function getConfig() {
  const defaultLogo =
    'https://github.githubassets.com/favicons/favicon-dark.png';
  const defaultBackground = `${baseUrl}/sample-background.jpg`;

  const config = {
    imageWidth: 1200,
    imageHeight: 630,
    paddingTop: 80,
    paddingLeft: 80,
    fontSize: 64,
    fontSizeSmall: 24,
    profileImgSize: 60,
    logoWidth: 60,
    logoHeight: 60,
    title:
      'This is a dynamically created image in a canvas element. Lorem ipsum dolor sit amet consectetur adipiscing elit et lorem ipsum dolorem.',
    meta: '29 January 2022',
    defaultBackground,
    background: defaultBackground,
    defaultLogo,
    logo: defaultLogo,
  };

  return { ...config, ...passedConfig };
}

async function loadFonts() {
  const font400 = 'poppins-latin-400-normal.ttf';
  const font600 = 'poppins-latin-600-normal.ttf';

  if (!isBrowser) {
    if (FontLibrary.has('Poppins')) {
      return;
    }

    const basePath =
      process.env.NODE_ENV === 'production' ? path.resolve('fonts') : './fonts';

    FontLibrary.use([
      `${basePath}/poppins-latin-400-normal.ttf`,
      `${basePath}/poppins-latin-600-normal.ttf`,
    ]);
  } else {
    await Promise.allSettled([
      await loadFont('Poppins', `/api/font/${font400}`, { weight: '400' }),
      await loadFont('Poppins', `/api/font/${font600}`, {
        weight: '600',
      }),
    ]);
  }
}

function drawText({
  ctx,
  text,
  font,
  x,
  y,
  maxWidth,
  maxHeight,
  lineHeight,
  type,
}: DrawTextProps) {
  ctx.save();

  ctx.fillStyle = '#fff';
  ctx.font = font;

  let height = 0; // For measuring text height
  const yAlphabetic = y + lineHeight * 0.7; // bug with textBaseLine = top causing error. So, reverting to default "alphabetic"

  if (type === 'title') {
    const { lineCount } = wrapText({
      ctx,
      text,
      font,
      x,
      y: yAlphabetic,
      maxWidth,
      maxHeight,
      lineHeight,
    });
    height = lineHeight * lineCount;
  } else {
    ctx.fillText(text, x, yAlphabetic);
  }
  ctx.restore();

  return { width: maxWidth, height: height || lineHeight };
}

async function loadImageBrowser(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
    img.crossOrigin = 'anonymous';
  });
}

async function loadImageByEnv(src: string) {
  if (isBrowser) {
    return loadImageBrowser(src);
  }
  return loadImage(src);
}

async function loadImageWithFallback(imageUrl: string, fallbackUrl: string) {
  let img;
  try {
    img = await loadImageByEnv(imageUrl);
  } catch (err) {
    console.error(err);
    img = await loadImageByEnv(fallbackUrl);
  }
  return img;
}

async function drawBackgroundImage(ctx: CanvasRenderingContext2D) {
  const { imageWidth, imageHeight, background, defaultBackground } =
    getConfig();

  const bgImg = await loadImageWithFallback(background, defaultBackground);

  ctx.save();
  cover(bgImg, 0, 0, imageWidth, imageHeight).render(ctx);

  // Dark overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(0, 0, imageWidth, imageHeight);
  ctx.restore();
}

function drawTitleText(ctx: CanvasRenderingContext2D) {
  const {
    imageWidth,
    paddingTop,
    paddingLeft,
    fontSize,
    fontSizeSmall,
    title,
    meta,
  } = getConfig();

  const lineHeight = fontSize * 1.25;
  const maxWidth = imageWidth - paddingLeft * 2;

  const { height } = drawText({
    ctx,
    text: title,
    font: `600 ${fontSize}px/${lineHeight}px Poppins`,
    x: paddingLeft,
    y: paddingTop,
    maxWidth,
    maxHeight: 240,
    lineHeight,
    type: 'title',
  });

  drawText({
    ctx,
    text: meta,
    font: `400 ${fontSizeSmall}px/${fontSizeSmall * 1.5}px Poppins`,
    x: paddingLeft,
    y: paddingTop + height + 24,
    maxWidth,
    maxHeight: fontSizeSmall * 1.5,
    lineHeight: fontSizeSmall * 1.5,
  });
}

async function drawProfileImageAndText(ctx: CanvasRenderingContext2D) {
  const {
    imageHeight,
    paddingTop,
    paddingLeft,
    fontSizeSmall,
    profileImgSize,
  } = getConfig();

  const profileImgX = paddingLeft;
  const profileImgY = imageHeight - paddingTop - profileImgSize;
  const profileImg = await loadImageByEnv(
    'https://secure.gravatar.com/avatar/fcbbe6a602b2ed048931956421f1f7f3'
  );
  ctx.save();
  ctx.beginPath();
  ctx.arc(
    profileImgX + profileImgSize / 2,
    profileImgY + profileImgSize / 2,
    profileImgSize / 2,
    0,
    Math.PI * 2,
    true
  );
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(
    profileImg,
    profileImgX,
    profileImgY,
    profileImgSize,
    profileImgSize
  );
  ctx.restore();

  const marginLeft = 24;
  const lineHeight = fontSizeSmall * 1.5;
  const font = `600 ${fontSizeSmall}px Poppins`;

  drawText({
    ctx,
    text: 'Kevin',
    font,
    x: profileImgX + profileImgSize + marginLeft,
    y: profileImgY + profileImgSize / 2 - lineHeight / 2,
    maxWidth: 500,
    maxHeight: lineHeight,
    lineHeight,
    type: 'name',
  });
}

async function drawLogo(ctx: CanvasRenderingContext2D) {
  const {
    imageWidth,
    imageHeight,
    paddingTop,
    paddingLeft,
    logoWidth,
    logoHeight,
    defaultLogo,
    logo,
  } = getConfig();

  const logoX = imageWidth - paddingLeft - logoWidth;
  const logoY = imageHeight - paddingTop - logoHeight;
  const logoImg = await loadImageWithFallback(logo, defaultLogo);

  ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
}

async function loadFont(
  name: string,
  url: string,
  descriptors?: FontFaceDescriptors // eslint-disable-line no-undef
) {
  const font = new FontFace(name, `url(${url})`, descriptors);
  await font.load();
  document.fonts.add(font);
  return true;
}

export async function buildCanvas(
  config: {},
  _canvas?: Canvas | HTMLCanvasElement
) {
  setConfig(config);
  const { imageWidth, imageHeight } = getConfig();

  const canvas = (_canvas as Canvas) || new Canvas(imageWidth, imageHeight);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  await loadFonts();

  ctx.fillStyle = '#e9ecef';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await Promise.allSettled([
    await drawBackgroundImage(ctx),
    await drawProfileImageAndText(ctx),
    drawTitleText(ctx),
    await drawLogo(ctx),
  ]);

  return canvas;
}
