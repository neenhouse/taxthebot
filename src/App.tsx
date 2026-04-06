import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyDashboard } from './components/CompanyDashboard';
import { TaxCalculator } from './components/TaxCalculator';
import { ImpactMap } from './components/ImpactMap';
import { PolicyCards } from './components/PolicyCards';
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
        <TaxCalculator />
        <ImpactMap />
        <PolicyCards />
        <TakeAction />
      </main>
      <Footer />
    </>
  );
}

export default App;
