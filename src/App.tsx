import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyDashboard } from './components/CompanyDashboard';
import { DisplacementStories } from './components/DisplacementStories';
import { TaxCalculator } from './components/TaxCalculator';
import { LegislativeTracker } from './components/LegislativeTracker';
import { ImpactMap } from './components/ImpactMap';
import { TakeAction } from './components/TakeAction';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <CompanyDashboard />
        <DisplacementStories />
        <TaxCalculator />
        <LegislativeTracker />
        <ImpactMap />
        <TakeAction />
      </main>
      <Footer />
    </>
  );
}

export default App;
