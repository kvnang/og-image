import {
  registerFont,
  createCanvas,
  loadImage,
  NodeCanvasRenderingContext2D,
  Canvas,
} from 'canvas';
import path from 'path';
import cover from '../utils/cover';
import { cleanObject, getBaseUrl } from '../utils/helpers';
import wrapText, { TextProps } from '../utils/wrapText';

interface DrawTextProps extends TextProps {
  type?: string;
}

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
    imageScale: 2,
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

interface FontFaceProps {
  family: string;
  weight?: string;
  style?: string;
}

async function loadFontServer(font: string, fontFace: FontFaceProps) {
  registerFont(path.resolve(`./fonts/${font}`), fontFace);
}

async function loadFonts() {
  const font400 = 'poppins-latin-300-normal.ttf';
  const font600 = 'poppins-latin-600-normal.ttf';

  if (typeof window === 'undefined') {
    await loadFontServer(font400, {
      family: 'Poppins',
      weight: '300',
    });
    await loadFontServer(font600, {
      family: 'Poppins',
      weight: '600',
    });
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
  ctx.font = font;
  ctx.textBaseline = 'top';

  ctx.fillStyle = '#ffffff';

  let height = 0; // For measuring text height

  if (type === 'title') {
    const { lineCount } = wrapText({
      ctx,
      text,
      font,
      x,
      y,
      maxWidth,
      maxHeight,
      lineHeight,
    });
    height = lineHeight * lineCount;
  } else {
    ctx.fillText(text, x, y);
  }

  ctx.restore();

  return { width: maxWidth, height: height || lineHeight };
}

async function loadImageWithFallback(imageUrl: string, fallbackUrl: string) {
  let img;
  try {
    img = await loadImage(imageUrl, { crossOrigin: 'anonymous' });
  } catch (err) {
    console.error(err);
    img = await loadImage(fallbackUrl, { crossOrigin: 'anonymous' });
  }
  return img;
}

async function drawBackgroundImage(ctx: NodeCanvasRenderingContext2D) {
  const { imageWidth, imageHeight, background, defaultBackground } =
    getConfig();

  const bgImg = await loadImageWithFallback(background, defaultBackground);

  cover(bgImg, 0, 0, imageWidth, imageHeight).render(ctx);
  // ctx.drawImage(bgImg, 0, 0, imageWidth, imageHeight);

  // Dark overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(0, 0, imageWidth, imageHeight);
  // ctx.globalCompositeOperation = "destination-over"; // Ensure that all subsequent draw operations occur on a layer above the background
}

function drawTitleText(ctx: NodeCanvasRenderingContext2D) {
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
    font: `600 ${fontSize}px Poppins`,
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
    font: `300 ${fontSizeSmall}px Poppins`,
    x: paddingLeft,
    y: paddingTop + height + 24,
    maxWidth,
    maxHeight: fontSizeSmall * 1.5,
    lineHeight: fontSizeSmall * 1.5,
  });
}

async function drawProfileImageAndText(ctx: NodeCanvasRenderingContext2D) {
  const {
    imageHeight,
    paddingTop,
    paddingLeft,
    fontSizeSmall,
    profileImgSize,
  } = getConfig();

  const profileImgX = paddingLeft;
  const profileImgY = imageHeight - paddingTop - profileImgSize;
  const profileImg = await loadImage(
    'https://secure.gravatar.com/avatar/fcbbe6a602b2ed048931956421f1f7f3',
    { crossOrigin: 'anonymous' }
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

async function drawLogo(ctx: NodeCanvasRenderingContext2D) {
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
  // const logo = await loadImage(
  // , {crossOrigin: 'anonymous'}   "https://secure.gravatar.com/avatar/fcbbe6a602b2ed048931956421f1f7f3"
  // );
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
  const { imageWidth, imageHeight, imageScale } = getConfig();

  await loadFonts();

  const canvas =
    (_canvas as Canvas) ||
    createCanvas(imageWidth * imageScale, imageHeight * imageScale);
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.scale(imageScale, imageScale);

  await Promise.allSettled([
    await drawBackgroundImage(ctx),
    drawTitleText(ctx),
    await drawProfileImageAndText(ctx),
    await drawLogo(ctx),
  ]);

  return canvas;
}
