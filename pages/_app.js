import '../styles/globals.css'
//import 'tailwindcss/tailwind.css'
import { CaretProvider } from '@/src/components/context/CartContext'
import Nprogress from 'nprogress';
import Router from 'next/router';
import { SWRConfig } from 'swr'
import axios from 'axios';
Router.onRouteChangeStart = () => Nprogress.start();
Router.onRouteChangeComplete = () => Nprogress.done();
Router.onRouteChangeError = () => Nprogress.done();

const fetcher = url => axios.get(url).then(res => res.data)

function MyApp({ Component, pageProps, }) {

  return (
    <CaretProvider>
      <SWRConfig value={{fetcher}}>
        <Component {...pageProps} />
      </SWRConfig>
    </CaretProvider>
  )
}

export default MyApp
