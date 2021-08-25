
export default function Carthead() {
    return (
        <div className="flex items-center justify-around  bg-gray-200  px-4 ">
            <div className="flex-1 px-4 py-3 text-center text-xs hidden md:block font-medium text-gray-500 uppercase tracking-wider">
            </div>
            <div className="flex-1 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Item
            </div>
            <div className="flex-1 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Quantity
            </div>
            <div className="flex-1 px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Price
            </div>
            <div className="flex-1 px-4 py-3 text-center text-xs hidden md:block font-medium text-gray-500 uppercase tracking-wider">
                Total
            </div>
            <div className="flex-1 px-4 py-3 text-center text-xs  font-medium text-gray-500 uppercase tracking-wider">
            </div>
        </div>

    )
}
