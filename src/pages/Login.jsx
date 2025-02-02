import { TextInput, PasswordInput, Button, Paper, Title, Text, Stack, Alert } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import useAuthStore from '../store/useAuthStore';
import { IconAlertCircle } from '@tabler/icons-react';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation(
    ({ email, password }) => login(email, password),
    {
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/dashboard');
      },
    }
  );

  return (
    <Paper p="xl" shadow="md" sx={{ maxWidth: 400, margin: '100px auto' }}>
      <Title order={2} mb="md">Login to WorkWad</Title>

      {/* Add test credentials info */}
      <Alert icon={<IconAlertCircle size={16} />} title="Test Credentials" color="blue" mb="md">
        Email: test@example.com
        <br />
        Password: password123
      </Alert>
      
      <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            {...register('email')}
          />
          
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...register('password')}
          />
          
          {loginMutation.isError && (
            <Text color="red" size="sm">
              Invalid email or password
            </Text>
          )}
          
          <Button
            type="submit"
            fullWidth
            loading={loginMutation.isLoading}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
