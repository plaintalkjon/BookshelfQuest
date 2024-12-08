import { useUser } from '@/hooks/useUser';
import { Text, Button } from '@/components/atoms';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();
  if (isLoading) {
    return <div className="home-loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      {user ? (
        // Logged-in view (Dashboard content)
        <>
          <header className="dashboard-header">
            <Text variant="h1">Welcome back, {user.user_metadata?.display_name || 'Reader'}</Text>
            <Text variant="body">Your reading journey continues</Text>
          </header>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <Text variant="h3">Currently Reading</Text>
              <Text variant="body">0 books</Text>
            </div>
            {/* ... other dashboard cards ... */}
          </div>
        </>
      ) : (
        // Public landing page
        <>
          <header className="home-hero">
            <Text variant="h1">Track Your Reading Journey</Text>
            <Text variant="body">
              Join BookshelfQuest to discover, track, and share your reading adventures
            </Text>
            <Button 
              variant="primary"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
          </header>
        </>
      )}
    </div>
  );
};

export default Home;
