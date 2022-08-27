import type { NextPage } from 'next';
import { Hero } from '../Components/Hero';
import { Navbar } from '../Components/Navbar';
const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
