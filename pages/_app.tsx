import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      // brand colors
      background: '#111111',
      color: '#fff',
      primary: '#fff',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default MyApp
