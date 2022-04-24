import * as React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import { Grid, CircularProgress } from '@mui/material';
import App from './App';
import UerServices from './Services/services/UserServices';

const Home = () => {
  return (
    <App>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 300
              }}
            >
              <Box sx={{ color: 'text.secondary' }}>Accessories</Box>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: 34,
                  fontWeight: 'medium'
                }}
              >
                {10}
              </Box>
              <Box
                component={TrendingUpIcon}
                sx={{
                  color: 'success.dark',
                  fontSize: 16,
                  verticalAlign: 'sub'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 300
              }}
            >
              <Box sx={{ color: 'text.secondary' }}>Foods</Box>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: 34,
                  fontWeight: 'medium'
                }}
              >
                {8}
              </Box>
              <Box
                component={TrendingUpIcon}
                sx={{
                  color: 'success.dark',
                  fontSize: 16,
                  verticalAlign: 'sub'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 300
              }}
            >
              <Box sx={{ color: 'text.secondary' }}>Registered Users</Box>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: 34,
                  fontWeight: 'medium'
                }}
              >
                {7}
              </Box>
              <Box
                component={TrendingUpIcon}
                sx={{
                  color: 'success.dark',
                  fontSize: 16,
                  verticalAlign: 'sub'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 300
              }}
            >
              <Box sx={{ color: 'text.secondary' }}>Registered Doctors</Box>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: 34,
                  fontWeight: 'medium'
                }}
              >
                {5}
              </Box>
              <Box
                component={TrendingUpIcon}
                sx={{
                  color: 'success.dark',
                  fontSize: 16,
                  verticalAlign: 'sub'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 300
              }}
            >
              <Box sx={{ color: 'text.secondary' }}>Vaccines</Box>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: 34,
                  fontWeight: 'medium'
                }}
              >
                {4}
              </Box>
              <Box
                component={TrendingUpIcon}
                sx={{
                  color: 'success.dark',
                  fontSize: 16,
                  verticalAlign: 'sub'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                borderRadius: 1,
                p: 2,
                minWidth: 300
              }}
            >
              <Box sx={{ color: 'text.secondary' }}>Orders</Box>
              <Box
                sx={{
                  color: 'text.primary',
                  fontSize: 34,
                  fontWeight: 'medium'
                }}
              >
                {2}
              </Box>
              <Box
                component={TrendingUpIcon}
                sx={{
                  color: 'success.dark',
                  fontSize: 16,
                  verticalAlign: 'sub'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    </App>
  );
};

export default Home;
