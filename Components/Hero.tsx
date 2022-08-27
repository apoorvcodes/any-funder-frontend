import Image from "next/image"
export function Hero(){
    return (
    <div className='min-h-screen w-screen pt-32 bg-moon pl-32 '>
       <div className='flex justify-around space-x-24 items-center flex-row'>
           <div className='flex flex-col '>
                <div className='text-[5rem] text-white font-extrabold'>
                   Decentreliazd
                </div> 
                <div className='text-7xl  text-white font-bold'>
                    Crowd <span className='text-primary'>Funding</span>
                </div>  
                <div className='text-xl text-purple-400 font-bold pt-2 font-sans'>
                   made easy with any-fund use it right now!!
                </div> 
                <div className='pt-8 font-sans'>
                </div>
            </div>
            <Image src={require('../public/img/Hero.svg')} height={500} />
        </div> 
    </div>
  )
}