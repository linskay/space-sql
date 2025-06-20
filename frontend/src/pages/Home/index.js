import React from 'react';
import SpaceHero from '../../components/SpaceHero';
import StarBackground from '../../components/StarBackground';

export default function Home() {
  return (
    <StarBackground isMainPage={true}>
      <div className="hero-wrapper">
        <SpaceHero />
      </div>
    </StarBackground>
  );
}
