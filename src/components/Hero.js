import Image from 'next/image'
export default function Hero() {
    return (
        <div className="mx-auto max-w-7xl bg-blue-100 my-8 h-[400px]">
            <div className="grid md:grid-cols-3 grid-cols-1 ">
                <div className=" grid col-span-2 relative h-full">
                    <div className=" text-gray-600 absolute  w-full h-[400px] bg-cover bg-center object-cover ">
                        <Image src="/hero.jpg" 
                        layout="fill" 
                        objectFit="cover" 
                        alt="" 
                        className="object-cover bg-center bg-contain overflow-hidden" />
                    </div>
                </div>
                <div className="text-4xl grid col-span-1 text-gray-600 pl-[60px]">
                    Modern, Comfortable Furnishings For Home
                </div>
            </div>
        </div>
    )
}
