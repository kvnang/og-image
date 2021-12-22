import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import debounce from 'just-debounce-it';
import { buildCanvas, getConfig } from '../lib/canvas';
import { breakpoints } from '../styles/breakpoints';
import { cleanObject, getBaseUrl } from '../utils/helpers';

const ContainerStyles = styled.section`
  --col-gap: 4rem;

  .row {
    display: flex;
    flex-flow: wrap;
    margin: calc(var(--col-gap) * -0.5);
  }

  .col {
    padding: calc(var(--col-gap) * 0.5);

    &.inputs {
      flex: 0 0 100%;
      max-width: 100%;

      @media ${breakpoints.laptopS} {
        flex: 0 0 40%;
        max-width: 40%;
      }
    }

    &.image {
      flex: 0 0 100%;
      max-width: 100%;

      @media ${breakpoints.laptopS} {
        flex: 0 0 60%;
        max-width: 60%;
      }
    }
  }

  .inputs {
    .form-field__label {
      width: 9ch;
    }
  }

  .image {
    .canvas-wrapper {
      display: block;
      position: relative;
      overflow: hidden;
      box-shadow: var(--box-shadow);
      background-color: var(--gray-2);
      max-width: 100%;
      width: 100%;
      aspect-ratio: 120 / 63;
      transition: box-shadow var(--transition);

      &:hover {
        box-shadow: var(--box-shadow-2);
      }
    }

    .canvas-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: var(--transition);

      &.loading {
        opacity: 1;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        pointer-events: none;
      }
    }
    .copy-link-wrapper {
      margin-top: 2rem;
      text-align: center;
    }
  }
`;

const baseUrl = getBaseUrl();

const defaultValues = {
  logo: `${baseUrl}/sample-logo.png`,
  background: `${baseUrl}/sample-background.jpg`,
  title:
    'This is a dynamically created image in a canvas element. Lorem ipsum dolor sit amet consectetur adipiscing elit et lorem ipsum dolorem.',
  meta: '22 January 2022',
  color: '#ffffff',
};

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputMetaRef = useRef<HTMLInputElement>(null);
  const inputBackgroundRef = useRef<HTMLInputElement>(null);
  const inputLogoRef = useRef<HTMLInputElement>(null);
  const inputColorRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState<string | undefined>(defaultValues.title);
  const [meta, setMeta] = useState<string | undefined>(defaultValues.meta);
  const [color, setColor] = useState<string | undefined>(defaultValues.color);
  const [background, setBackground] = useState<string | undefined>(
    defaultValues.background
  );
  const [logo, setLogo] = useState<string | undefined>(defaultValues.logo);

  const [loading, setLoading] = useState<boolean>(false);
  const [canvasOverlay, setCanvasOverlay] = useState<string | undefined>(
    undefined
  );

  const { imageWidth, imageHeight } = getConfig();

  async function updateCanvas(data: Record<string, string | undefined>) {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = imageWidth;
    canvas.height = imageHeight;

    await buildCanvas(data, canvas);

    setLoading(false);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }
        const objectURL = window.URL.createObjectURL(blob);
        setCanvasOverlay(objectURL);
      },
      'image/jpeg',
      0.75
    );
  }

  const maybeUpdateCanvas = useCallback(
    debounce(
      (data: Record<string, string | undefined>) => updateCanvas(data),
      500
    ),
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setLoading(true);
    maybeUpdateCanvas({ title, meta, background, logo, color });
  }, [title, meta, background, logo, color]);

  const getLinkParams = () => {
    const params = {
      title,
      meta,
      background,
      logo,
      color,
    };

    // remove null, undefined, empty string values
    const cleanParams = cleanObject(params) as Record<string, string>;

    const urlParams = new URLSearchParams(cleanParams).toString();

    return urlParams ? `?${urlParams}` : '';
  };

  const getLink = () => `${baseUrl}/api/image${getLinkParams()}`;

  return (
    <ContainerStyles className="container">
      <div className="row">
        <div className="col inputs">
          <form
            action="/api/image"
            target="_blank"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div className="form-fields">
              <div className="form-fields__inner">
                <div className="form-field">
                  <label htmlFor="title">
                    <span className="form-field__label">Title</span>
                    <div className="form-field__input">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="My news article ..."
                        ref={inputTitleRef}
                        onChange={() => setTitle(inputTitleRef.current?.value)}
                        defaultValue={defaultValues.title}
                      />
                    </div>
                  </label>
                </div>
                <div className="form-field">
                  <label htmlFor="meta">
                    <span className="form-field__label">Meta</span>
                    <div className="form-field__input">
                      <input
                        type="text"
                        id="meta"
                        name="meta"
                        placeholder="1 January 1990"
                        ref={inputMetaRef}
                        onChange={() => setMeta(inputMetaRef.current?.value)}
                        defaultValue={defaultValues.meta}
                      />
                    </div>
                  </label>
                </div>
                <div className="form-field">
                  <label htmlFor="color">
                    <span className="form-field__label">Color</span>
                    <div className="form-field__input">
                      <input
                        type="text"
                        id="color"
                        name="color"
                        placeholder="#ffffff"
                        ref={inputColorRef}
                        onChange={() => setColor(inputColorRef.current?.value)}
                        defaultValue={defaultValues.color}
                      />
                    </div>
                  </label>
                </div>
                <div className="form-field">
                  <label htmlFor="background">
                    <span className="form-field__label">Background</span>
                    <div className="form-field__input">
                      <input
                        type="url"
                        id="background"
                        name="background"
                        placeholder="https://www.example.com/image.jpg"
                        ref={inputBackgroundRef}
                        onChange={() =>
                          setBackground(inputBackgroundRef.current?.value)
                        }
                        defaultValue={defaultValues.background}
                      />
                      <p className="form-field__desc">
                        Accepts URL or Hex color
                      </p>
                    </div>
                  </label>
                </div>
                <div className="form-field">
                  <label htmlFor="logo">
                    <span className="form-field__label">Logo</span>
                    <div className="form-field__input">
                      <input
                        type="url"
                        id="logo"
                        name="logo"
                        placeholder="https://www.example.com/image.jpg"
                        ref={inputLogoRef}
                        onChange={() => setLogo(inputLogoRef.current?.value)}
                        defaultValue={defaultValues.logo}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col image">
          <a
            className="canvas-wrapper"
            href={getLink()}
            target="_blank"
            rel="noreferrer"
            title="Click to view image"
          >
            <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
            <div className={`canvas-overlay ${loading ? 'loading' : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={canvasOverlay} alt="" width={2400} height={1260} />
            </div>
          </a>
          <div className="copy-link-wrapper">
            <button
              type="button"
              className="button"
              onClick={() => navigator.clipboard.writeText(getLink())}
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </ContainerStyles>
  );
}
