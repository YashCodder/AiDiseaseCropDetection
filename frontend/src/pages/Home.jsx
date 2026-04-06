import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Stats from "../components/Stats";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="features">
        <h2>Our Features</h2>

        <div className="feature-grid">
          <FeatureCard 
  title="AI Disease Detection" 
  desc="CNN-based image analysis with high accuracy for early-stage disease detection."
  icon="🤖"
/>

<FeatureCard 
  title="IoT Monitoring" 
  desc="Real-time soil data collection including moisture, temperature, and pH levels."
  icon="📡"
/>

<FeatureCard 
  title="Predictive Analytics" 
  desc="LSTM models predict disease outbreaks 7–21 days in advance."
  icon="📊"
/>
        </div>
      </section>

      <Stats />
    </>
  );
}