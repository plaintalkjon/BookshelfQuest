import { useState } from 'react';
import { Button, Text } from '@/components/atoms';
import { Form } from '@/components/molecules';
import { useAuth } from '@/hooks/useAuth';
import './Login.css';

export const Login = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const { login, signup, forgotPassword } = useAuth();

  const fields = mode === 'forgot' ? [
    { name: 'email', label: 'Email', type: 'email', required: true }
  ] : mode === 'login' ? [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ] : [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true }
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    if (mode === 'forgot') {
      forgotPassword.mutate(data.email);
    } else if (mode === 'login') {
      login.mutate({
        email: data.email,
        password: data.password,
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

  return (
    <div className="login-container">
      <div className="login-card">
        <Text variant="h1" className="login-title">
          {mode === 'forgot' 
            ? 'Reset Password'
            : mode === 'login' 
              ? 'Welcome Back' 
              : 'Create Account'}
        </Text>
        
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          submitText={mode === 'forgot' 
            ? 'Send Reset Link'
            : mode === 'login' 
              ? 'Sign In' 
              : 'Sign Up'}
          loading={login.isPending || signup.isPending || forgotPassword.isPending}
          error={login.error?.message || signup.error?.message || forgotPassword.error?.message}
          className="login-form"
        />

        <div className="login-footer">
          {mode === 'login' && (
            <>
              <Button
                variant="tertiary"
                onClick={() => setMode('forgot')}
              >
                Forgot Password?
              </Button>
              <Text variant="body-small">
                Don't have an account?
              </Text>
              <Button
                variant="tertiary"
                onClick={() => setMode('signup')}
              >
                Sign Up
              </Button>
            </>
          )}
          {mode === 'forgot' && (
            <Button
              variant="tertiary"
              onClick={() => setMode('login')}
            >
              Back to Login
            </Button>
          )}
          {mode === 'signup' && (
            <>
              <Text variant="body-small">
                Already have an account?
              </Text>
              <Button
                variant="tertiary"
                onClick={() => setMode('login')}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 