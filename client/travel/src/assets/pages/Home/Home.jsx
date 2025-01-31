import React from 'react'
import Header from '../../components/Header/Header'
import HeroSection from '../../components/HeroSection/HeroSection'
import Destinations from '../../components/Destinations/Destinations'
import Banner from '../../components/Banner/Banner'
import Testimonials from '../../components/Testimonials/Testimonials'
import Contact from '../../components/Contact/Contact'
import Footer from '../../components/Footer/Footer'
import Ticker from '../../components/Ticker/Ticker'
import SecNav from '../../components/SecNav/SecNav'
import HeroSecVersion from '../../components/HeroSecVersion/HeroSecVersion'
import HotelsSec from '../../components/HotelsSec/HotelsSec'
import FlightDeals from '../../components/FlightDeals/FlightDeals'

const Home = () => {
  return (
    <div>
      <HeroSecVersion/>
      <Ticker/>
      <Destinations/>
      <FlightDeals/>
      <HotelsSec  />
      <Banner/>
      <Testimonials/>
      <Contact/>
    </div>
  )
}

export default Home