import Image from 'next/image';
export function Hero() {
  return (
    <div className="min-h-screen w-screen pt-32 bg-moon pl-32 ">
      <div className="flex justify-around space-x-24 items-center flex-row">
        <div className="flex flex-col ">
          <div className="text-[4rem] text-white font-extrabold">
            Decentralized, Censorship-free
          </div>
          <div className="text-5xl  text-white font-bold">
            Crowd <span className="text-primary">Funding</span>
          </div>
          <div className="text-xl text-purple-400 font-bold pt-2 font-sans">
            making payments and sponsorships easy over the blockchain.
          </div>
          <div className="pt-8 font-sans"></div>
        </div>
        <Image src={require('../public/img/Hero.svg')} height={500} />
      </div>
    </div>
  );
}
