import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

import supabase from '@/lib/supabase';

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const theme = useTheme();
  const router = useRouter();

  const primary = theme.colorScale?.[9] ?? theme.palette.primary.main;

  const secondary = theme.secondaryScale?.[9] ?? theme.palette.secondary.main;

  const isSignup = mode === 'signup';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [notice, setNotice] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setNotice('');

    if (password.length < 8) {
      setError('Your password must contain at least 8 characters.');
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim(),
          password
        });

        if (signupError) {
          throw signupError;
        }

        if (!data.session) {
          setNotice(
            'Your account was created. Check your email to confirm your address, then log in. An administrator must approve your account before you can access the dashboard.'
          );
          return;
        }

        // Registration is not authorization. AdminAuthGuard checks
        // whether this account has been approved.
        await router.replace('/admin');
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (loginError) {
          throw loginError;
        }

        await router.replace('/admin');
      }
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Authentication failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: 5,
        bgcolor: 'background.default',
        backgroundImage: `
          radial-gradient(
            circle at 15% 15%,
            ${alpha(primary, 0.12)},
            transparent 35%
          ),
          radial-gradient(
            circle at 85% 85%,
            ${alpha(secondary, 0.12)},
            transparent 35%
          )
        `
      }}
    >
      <Container maxWidth="xs" disableGutters>
        <Stack spacing={2} sx={{ mb: 4, alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            sx={{
              width: 56,
              height: 56,
              color: '#fff',
              background: `linear-gradient(135deg, ${primary}, ${secondary})`
            }}
          >
            <CodeRoundedIcon fontSize="large" />
          </Avatar>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, letterSpacing: '-0.04em' }}
            >
              CRYPTECH
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Administration Console
            </Typography>
          </Box>
        </Stack>

        <Paper
          variant="outlined"
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            bgcolor: alpha(theme.palette.background.paper, 0.92),
            backdropFilter: 'blur(16px)'
          }}
        >
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 850, letterSpacing: '-0.04em' }}
            >
              {isSignup ? 'Create an account' : 'Welcome back'}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {isSignup
                ? 'Register an account. Dashboard access requires administrator approval.'
                : 'Sign in with your authorized administrator account.'}
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {notice && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {notice}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                required
                type="email"
                label="Email address"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <TextField
                fullWidth
                required
                type="password"
                label="Password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                helperText={isSignup ? 'Use at least 8 characters.' : undefined}
              />

              {isSignup && (
                <TextField
                  fullWidth
                  required
                  type="password"
                  label="Confirm password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              )}

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : isSignup ? (
                    <PersonAddAlt1RoundedIcon />
                  ) : (
                    <LoginRoundedIcon />
                  )
                }
                sx={{
                  py: 1.4,
                  mt: 1,
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: `0 8px 24px ${alpha(primary, 0.22)}`
                  }
                }}
              >
                {loading
                  ? 'Please wait...'
                  : isSignup
                    ? 'Create account'
                    : 'Sign in'}
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textAlign: 'center' }}
          >
            {isSignup ? 'Already have an account? ' : 'New here? '}

            <MuiLink
              component={Link}
              href={isSignup ? '/login' : '/signup'}
              underline="hover"
              sx={{ fontWeight: 700 }}
            >
              {isSignup ? 'Sign in' : 'Create an account'}
            </MuiLink>
          </Typography>
        </Paper>

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            display: 'block',
            mt: 3
          }}
        >
          Protected by Supabase Authentication
        </Typography>
      </Container>
    </Box>
  );
}
