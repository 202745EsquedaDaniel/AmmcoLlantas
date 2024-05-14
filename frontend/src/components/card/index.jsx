const Card = (data) => {
    return(
        <div 
         className=' bg-red-600 cursor-pointer w-56 h-60 rounded-lg'
         >
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-xl text-black text-xs m-2 px-3 py-0.6">{data.name}</span>
                <img className="w-full h-full object-cover rounded-lg" src={""} alt="HeadPhone"></img>
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light">{data.data.name}</span>
                <span className=" text-lg font-medium">${data.data.price}</span>
            </p>
        </div>
    )
}

export {Card}