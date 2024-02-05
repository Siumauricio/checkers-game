import '../styles/globals.css';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import type {AppProps} from 'next/app';

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
   },
});

function MyApp({Component, pageProps}: AppProps) {
   asdasdfadsf asdf asdf .asd fasdf asdf
   return (
      <NextThemesProvider
         defaultTheme="system"
         attribute="class"
         value={{
            dark: darkTheme.className,
         }}
      >
         <NextUIProvider theme={darkTheme}>
            <Component {...pageProps} />
         </NextUIProvider>
      </NextThemesProvider>
   );
}

export default MyApp;
