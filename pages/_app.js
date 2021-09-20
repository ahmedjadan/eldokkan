import '../styles/globals.css'
//import 'tailwindcss/tailwind.css'
import { CaretProvider } from '@/src/components/context/CartContext'
import Nprogress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head'
import { SWRConfig } from 'swr'
import axios from 'axios';
Router.onRouteChangeStart = () => Nprogress.start();
Router.onRouteChangeComplete = () => Nprogress.done();
Router.onRouteChangeError = () => Nprogress.done();


// fetcher function for SWR use cases
const fetcher = url => axios.get(url).then(res => res.data)

function MyApp({ Component, pageProps, }) {
  <Head>
    <title>El-Dokkan | Home</title>
    <meta key="charSet" charSet="UTF-8" />
    <meta name="robots" content="follow, index" />
    <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
    <meta key="httpEquiv" httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta key="title" name="title" content="El-Dokkan" />
    <meta key="description" name="description" content="modern e-commerce small shop, using Strapi for backend, Nextjs for frontend and payment integration with PayPal, " />
    <meta key="keywords" name="keywords" content="shop, dokkan, e-commerce" />
    <meta key="author" name="author" content="Ahmed Jadan" />
    <meta key="og:title" property="og:title" content={"El-Dokkan | E-commerce" || "By Ahmed Ja'dan"} />
    <meta key="og:description" property="og:description" content="modern e-commerce small shop, using Strapi for backend, Nextjs for frontend and payment integration with PayPal," />
    <meta key="og:type" property="og:type" content="website" />
  </Head>
  return (
    <CaretProvider>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </CaretProvider>
  )
}

export default MyApp
