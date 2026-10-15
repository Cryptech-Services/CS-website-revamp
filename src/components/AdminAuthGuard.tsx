import * as React from 'react';
import { useRouter } from 'next/router';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography
} from '@mui/material';

import supabase from '@/lib/supabase';

type AdminAuthGuardProps = {
  children: React.ReactNode;
};

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();

  const [checking, setChecking] = React.useState(true);
  const [authorized, setAuthorized] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let active = true;

    const checkAccess = async () => {
      setChecking(true);
      setError('');

      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();

        if (userError || !user) {
          if (active) {
            setAuthorized(false);
            await router.replace('/login');
          }
          return;
        }

        const { data: admin, error: adminError } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (adminError) {
          throw adminError;
        }

        if (!active) {
          return;
        }

        if (!admin) {
          setAuthorized(false);
          await supabase.auth.signOut();
          await router.replace('/login?reason=not-authorized');
          return;
        }

        setAuthorized(true);
      } catch (caught) {
        if (active) {
          setAuthorized(false);
          setError(
            caught instanceof Error
              ? caught.message
              : 'Unable to verify administrator access.'
          );
        }
      } finally {
        if (active) {
          setChecking(false);
        }
      }
    };

    void checkAccess();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setAuthorized(false);
        void router.replace('/login');
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Stack sx={{ alignItems: 'center', spacing: 2 }}>
          <CircularProgress />
          <Typography color="text.secondary">
            Verifying administrator access...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Alert severity="error">{error}</Alert>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Check that the `admin_users` table exists and its SELECT policy allows
          users to check their own authorization.
        </Typography>

        <Button sx={{ mt: 2 }} onClick={() => void router.replace('/login')}>
          Back to login
        </Button>
      </Box>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
