import { Button, Text } from '@/components/atoms';
import { NavbarProps } from './Navbar.types';
import './Navbar.css';

export const Navbar = ({ className = '' }: NavbarProps) => {
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
          >
            {item.label}
          </Text>
        ))}
      </div>

      <div className="navbar-actions">
        <Button variant="secondary" size="small">Sign In</Button>
      </div>
    </nav>
  );
}; 