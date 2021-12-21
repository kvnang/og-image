import Head from 'next/head';
// import Image from 'next/image';
import styled from 'styled-components';
import Canvas from '../components/Canvas';

const ContainerStyles = styled.div`
  position: relative;
`;

const WrapperStyles = styled.div`
  padding: 0 2rem;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
`;

const MainStyles = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterStyles = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid var(--color-footer-separator);
  justify-content: center;
  align-items: center;
`;

const GitHubCornerStyles = styled.a`
  display: block;
  position: absolute;
  top: 0;
  border: 0;
  right: 0;

  svg {
    fill: #151513;
    color: #fff;
  }
`;

const TitleStyles = styled.section`
  margin-bottom: 5rem;
  width: 100%;

  h1 {
    font-size: 2rem;

    span {
      font-weight: 400;
      font-style: italic;
    }
  }

  p {
    max-inline-size: var(--size-content-3);
  }
`;

export default function Home() {
  return (
    <ContainerStyles>
      <Head>
        <title>Dynamic og:image Generator using Canvas API</title>
        <meta
          name="description"
          content="Lightning fast og:image on-the-fly generation using Canvas API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GitHubCornerStyles
        href="https://github.com/kvnang/og-image"
        className="github-corner"
        aria-label="View source on GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="80" height="80" viewBox="0 0 250 250">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: '130px 106px' }}
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
          />
        </svg>
      </GitHubCornerStyles>

      <WrapperStyles>
        <MainStyles>
          <TitleStyles>
            <h1>
              <code style={{ color: 'var(--gray-8)' }}>&lt;canvas&gt;</code>{' '}
              <code style={{ color: 'var(--color-primary)' }}>og:image</code>
            </h1>
            <p>
              Lightning fast <code>og:image</code> on-the-fly generation using
              purely Canvas API. No Puppeteer needed!
            </p>
          </TitleStyles>
          <Canvas />
        </MainStyles>

        <FooterStyles>
          <p>
            By{' '}
            <a
              href="https://github.com/kvnang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Kevin Ang</strong>
            </a>
          </p>
        </FooterStyles>
      </WrapperStyles>
    </ContainerStyles>
  );
}
