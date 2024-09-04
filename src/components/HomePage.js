import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import CardSection from './CardSection';
import AlternatingSection from './AlternatingSection';
import TestimonialsSection from './TestimonialsSection';
import FooterSection from './FooterSection';
import LocationSection from './LocationSection'; // Import the new LocationSection component
import { useNavigate } from 'react-router-dom';
import WhoUsesSection from './WhoUsesSection';

const HomePage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const navigate = useNavigate();

  const handleExpandClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const cards = [
    { name: 'Bark', route: '/bark-type-selection' },
    { name: 'Leaf', route: '/leaf-type-selection' },
    { name: 'Flower', route: '/flower-arrangement' },
    { name: 'Fruit', route: '/fruit-type-selection' },
  ];

  const testimonials = [
    {
      image: 'https://via.placeholder.com/50',
      name: 'Alex Acker',
      designation: 'Senior Manager, Marketing & Insights',
      company: 'Nitro',
      feedback: 'Vaultflow provided us the ability to track unique events and segment who the users are and what each user is doing. Google Analytics doesn’t allow that.',
    },
    {
      image: 'https://via.placeholder.com/50',
      name: 'David Shackelford',
      designation: 'Project Manager',
      company: 'PagerDuty',
      feedback: 'We saw a 25% boost in trial engagement using Vaultflow\'s cohort reports. Vaultflow showed us that as our redesigned trial wizard, new users were actively using the product earlier in their trial, and using more of the features in the product.',
    },
    {
      image: 'https://via.placeholder.com/50',
      name: 'Spencer Mann',
      designation: 'VP of Growth',
      company: 'Lucidchart',
      feedback: 'Insights from Vaultflow drove a 30% lift in our conversions. All of our key customer behavior data lives in Vaultflow.',
    },
  ];

  const alternatingContent = [
    {
      image: "/mnt/data/image.png",
      alt: "Interactive meeting",
      title: "Why Tutum insurance?",
      text: "Tutum offers a large range of premium insurance packages at affordable prices. Start an online quote or have a representative call you back. It’s that simple.",
      color: "#1A237E"
    },
    {
      image: "/mnt/data/image.png",
      alt: "Team celebration",
      title: "Modern insurance template",
      text: "Tutum offers a large range of premium insurance packages at affordable prices. Start an online quote or have a representative call you back. It’s that simple.",
      color: "#009FFD"
    }
  ];

  return (
    <div>
      <NavigationBar />
      <HeroSection />
      <CardSection cards={cards} handleCardClick={(route) => navigate(route)} />
      <AlternatingSection content={alternatingContent} />
      <TestimonialsSection
        testimonials={testimonials}
        expandedCard={expandedCard}
        handleExpandClick={handleExpandClick}
      />
      <WhoUsesSection />
      <LocationSection />
      <FooterSection navigate={navigate} />
    </div>
  );
};

export default HomePage;