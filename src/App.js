import React from 'react';
import './styles/global.css';

import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Services     from './components/Services';
import About        from './components/About';
import WhyUs        from './components/WhyUs';
import Team         from './components/Team';
import Testimonials from './components/Testimonials';
import Locations    from './components/Locations';
import Appointment  from './components/Appointment';
import FAQ          from './components/FAQ';
import Footer       from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <Team />
      <Testimonials />
      <Appointment />
      <FAQ />
      <Footer />
    </>
  );
}
