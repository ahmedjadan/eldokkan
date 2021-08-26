import '../styles/globals.css'
//import 'tailwindcss/tailwind.css'
import { CaretProvider } from '@/src/components/context/CartContext'
function MyApp({ Component, pageProps, }) {

  return (
    <CaretProvider>
      <Component {...pageProps} />
    </CaretProvider>
  )
}

export default MyApp
