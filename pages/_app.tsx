import type { AppProps } from 'next/app';
import 'normalize.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import GlobalStyles from '../styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
    </>
  );
}

export default MyApp;
