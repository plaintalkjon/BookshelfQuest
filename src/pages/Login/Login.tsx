import { useState } from 'react';
import { Button, Text } from '@/components/atoms';
import { Form } from '@/components/molecules';
import { useAuth } from '@/hooks/useAuth';
import './Login.css';

export const Login = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { login, signup } = useAuth();

  const fields = mode === 'login' ? [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true }
  ] : [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true }
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    if (mode === 'login') {
      login.mutate({
        email: data.email,
        password: data.password
      });
    } else {
      signup.mutate({
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
    }
  };

  const error = login.error || signup.error;
  const loading = login.isPending || signup.isPending;

  return (
    <div className="login-container">
      <div className="login-card">
        <Text variant="h1" className="login-title">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </Text>
        
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          submitText={mode === 'login' ? 'Sign In' : 'Sign Up'}
          loading={loading}
          error={error?.message}
          className="login-form"
        />

        <div className="login-footer">
          <Text variant="body-small">
            {mode === 'login' 
              ? "Don't have an account?" 
              : "Already have an account?"}
          </Text>
          <Button
            variant="tertiary"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login; 