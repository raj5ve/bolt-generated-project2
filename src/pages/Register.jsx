import { TextInput, PasswordInput, Button, Paper, Title, Text, Stack } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../api/auth';
import useAuthStore from '../store/useAuthStore';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/dashboard');
    },
  });

  return (
    <Paper p="xl" shadow="md" sx={{ maxWidth: 400, margin: '100px auto' }}>
      <Title order={2} mb="md">Join WorkWad</Title>
      
      <form onSubmit={handleSubmit((data) => registerMutation.mutate(data))}>
        <Stack>
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            required
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            required
            error={errors.password?.message}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
          />
          
          {registerMutation.isError && (
            <Text color="red" size="sm">
              Registration failed. Please try again.
            </Text>
          )}
          
          <Button
            type="submit"
            fullWidth
            loading={registerMutation.isLoading}
          >
            Create Account
          </Button>
          
          <Text align="center" size="sm">
            Already have an account?{' '}
            <Text 
              component="span" 
              color="blue" 
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Login
            </Text>
          </Text>
        </Stack>
      </form>
    </Paper>
  );
}
