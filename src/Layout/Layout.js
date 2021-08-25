import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
export default function Layout({children}) {
    return (
        <>
         <div className="grid min-h-screen mx-auto "
        style={{ gridTemplateRows: 'auto 1fr auto'}}
      >
           <Navbar/>
            <main className=""> {children} </main>
            <Footer/>
        </div>
        </>
    )
}
