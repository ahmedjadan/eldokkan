import Footer from '@/src/components/Footer'
import Navbar from '@/src/components/Navbar'
export default function Layout({children}) {
    return (
        <>
         <div className="grid min-h-screen mx-auto px-1"
        style={{ gridTemplateRows: 'auto 1fr auto'}}
      >
           <Navbar/>
            <main className=""> {children} </main>
            <Footer/>
        </div>
        </>
    )
}
