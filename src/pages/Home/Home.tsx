import './Home.css';
import { Button } from '@/components'

export const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to BookshelfQuest</h1>
        <p className="subtitle">Your personal library adventure</p>
      </header>

      <section className="feature-cards">
        <div className="card">
          <h2>Track Books</h2>
          <p>Keep track of your reading journey</p>
          <Button variant="secondary" size="small">Follow</Button>
        </div>

        <div className="card">
          <h2>Set Goals</h2>
          <p>Challenge yourself with reading goals</p>
          <button className="btn-secondary">Learn More</button>
        </div>

        <div className="card">
          <h2>Join Community</h2>
          <p>Connect with fellow readers</p>
          <button className="btn-tertiary">Join Now</button>
        </div>
      </section>

      <section className="info-section">
        <div className="info-box">
          <h3>Getting Started</h3>
          <p>Begin your reading adventure today!</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
