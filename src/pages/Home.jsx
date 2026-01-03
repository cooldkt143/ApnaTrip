import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/home/Main';
import Explore from '../components/home/Explore';
import Popular from '../components/home/PopularTour';
import CreateTripToggle from '../components/home/CreateTripToggle';

import BudgetEstimate from '../components/home/BudgetEstimate';
import Footer from '../components/home/Footer';

// Import category images
import communitiesImg from '../assets/images/communities.jpg';
import handsImg from '../assets/images/Hands.gif';
import budgets from '../assets/images/budget.jpg';
import calendar from '../assets/images/calendar.jpg';
import travelitinerary from '../assets/images/travelitinerary.jpg';

const categories = [
  { img: communitiesImg, alt: 'Malé, Maldives', subtitle: 'Create Your', title: 'Trips' },
  { img: handsImg, alt: 'Bangkok, Thailand', subtitle: 'Search ', title: 'Cities' },
  { img: budgets, alt: 'Kuala Lumpur, Malaysia', subtitle: 'Estimate', title: 'Budget' },
  { img: calendar, alt: 'Kathmandu, Nepal', subtitle: 'Explore', title: 'Your Calender' },
  { img: travelitinerary, alt: 'Jakarta, Indonesia', subtitle: 'Plan your', title: 'Iternary' },
];

const popularTours = [
  { image: '/homePopular/sunset in mountains.jpg', title: 'Solo? they say "manzilon ki kya khabar, jab raahon se ishq ho"', duration: '12 Days', rating: 4 },
  { image: '/homePopular/sunset.jpg', title: 'Outing With Friends/ Family? they say "Hum saath saath hain"', duration: '12 Days', rating: 4 },
  { image: '/homePopular/rajasthan India.jpg', title: 'Need a Suspense Trip? they say "yeh sham, tum aur ankahi dastan"', duration: '12 Days', rating: 4 },
];

const Home = () => {
  const location = useLocation();

  return (
    <div id='home' className="top-0 left-0 w-full min-h-screen">
      {/* Pass the current location to Header for blur logic */}
      <Header currentPath={location.pathname} />
      <Main />
      <Explore categories={categories} />
      <Popular popularTours={popularTours} />
      <BudgetEstimate />
      <Footer />
      <CreateTripToggle />
    </div>
  );
};

export default Home;