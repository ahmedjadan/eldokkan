import '../styles/globals.css'
//import 'tailwindcss/tailwind.css'
import { CaretProvider } from '@/src/components/context/CartContext'
import Nprogress from 'nprogress';
import Router from 'next/router';


Router.onRouteChangeStart = () => Nprogress.start();
Router.onRouteChangeComplete = () => Nprogress.done();
Router.onRouteChangeError = () => Nprogress.done();


function MyApp({ Component, pageProps, }) {

  return (
    <CaretProvider>
      <Component {...pageProps} />
    </CaretProvider>
  )
}

export default MyApp
