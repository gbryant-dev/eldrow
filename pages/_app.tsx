import { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'

function MyApp({ Component, pageProps }: AppProps) {

  
  return typeof window !== undefined && (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
