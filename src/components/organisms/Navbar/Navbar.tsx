import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@/components/atoms';
import { NavbarProps } from './Navbar.types';

import './Navbar.css';

export const Navbar = ({ className = '' }: NavbarProps) => {
  const navigate = useNavigate();
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Library', path: '/library' },
    { label: 'Community', path: '/community' },
  ];

  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar-brand">
        <Text variant="h2" color="primary">BookshelfQuest</Text>
      </div>
      
      <div className="navbar-links">
        {navItems.map((item) => (
          <Text 
            key={item.path}
            variant="body"
            color="primary"
            className="nav-link"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Text>
        ))}
      </div>

      <div className="navbar-actions">
        <Button 
          variant="secondary" 
          size="small"
          onClick={() => navigate('/login')}
        >
          Sign In
        </Button>
      </div>
    </nav>
  );
}; 