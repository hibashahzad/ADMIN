import * as React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import { Grid, CircularProgress } from '@mui/material';
import App from './App';
import UerServices from './Services/services/UserServices';

const Home = () => {
  return (
    <App>
      <Box sx={{ flexGrow: 1 }}></Box>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh'
        }}
      ></div>
    </App>
  );
};

export default Home;
