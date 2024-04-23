import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Icons } from '@/components/ui/icons.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { cn } from '@/lib/utils'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      console.log('Response status:', response.status); // Log the response status
      //If response is success, redirect
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Log the response status
        await login({ username, id: data.id });
        navigate('/build');
      } else {
        setError('There is an issue with the response');
        console.log(await response.json())
      }
    } catch (error) {
      setError('Something went wrong. Sorry idk');
      alert(error)
      console.error('Error:', error); // Log the error
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className={cn("grid gap-6")}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
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
              placeholder=""
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
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In with Email
          </Button>
            <p className="text-sm text-muted-foreground">
                Enter your email to create your account
            </p>
        </div>
      </form>
        </div>
    </div>
  );
};

export default Login;
