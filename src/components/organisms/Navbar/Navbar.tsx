import { useNavigate } from "react-router-dom";
import { Button, Text } from "@/components/atoms";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();
  const { logout } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Library", path: "/library" },
    { label: "Community", path: "/community" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Button variant="secondary" size="medium" onClick={() => navigate("/")}>
          BookshelfQuest
        </Button>
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
        <Text variant="body" color="primary" className="nav-link" onClick={() => navigate("/profile")}>Profile</Text>
      </div>

      <div className="navbar-actions">
        {isLoading ? null : user ? (
          <Button
            variant="secondary"
            size="small"
            onClick={() => logout.mutate()}
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="small"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};
