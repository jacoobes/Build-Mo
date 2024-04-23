import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Icons } from '@/components/ui/icons.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { cn } from '@/lib/utils';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', response.status); // Log the response status

      //If response is success, redirect
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Log the response status
        console.log(data); // handle success, maybe redirect
        await login({ username, id: data.id });
        navigate('/build');
      } else {
        setError('There is an issue with the response');
        console.log(await response.json());
      }
    } catch (error) {
      setError('Something went wrong. Sorry idk');
      alert(error);
      console.error('Error:', error); // Log the error
    }
  };

  return (
    <div className="h-screen flex items-center justify-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className={cn('grid gap-6 border-4 border-gray-700 p-8 rounded-2xl')}>
        <form onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold text-foreground mb-4">Login</h1>
          <div className="grid gap-3">
            <div className="grid gap-3">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Email Address"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Login with Email
            </Button>
          </div>
        </form>
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
