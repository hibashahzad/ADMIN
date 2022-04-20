/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import App from './App';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import firebase from 'firebase/compat/app';
import Container from '@mui/material/Container';
import { CircularProgress, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useHistory, useParams } from 'react-router-dom';
import back from './Pic1.jpg';

import { configapp, storage } from './firebase';
import ResponsiveDrawer from './admindashborad';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex ',
//     justifyContent: 'center ',
//     alignItems: 'center ',
//     height: '100vh',
//     flexDirection: 'column'
//   },
//   child: {
//     width: '45%'
//   },
//   multilineColor: {
//     color: 'green'
//   }
// }));
const validationSchema = yup.object({
  name: yup
    .string('Enter Category')

    .required('Category is required')
});
export default function AddEditCategory() {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      name: 'aaa'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  const [loading, setloading] = React.useState(false);
  const setform = (e) => {};

  const handleSubmit = (event) => {
    event.preventDefault();

    setloading(true);
  };
  const notify = (error) =>
    toast(error, { position: 'top-left', type: 'error' });

  return (
    <App>
      <Wrapper>
        <div
          style={{
            margin: '7px 0',
            display: 'flex',
            height: '100%',
            alignItems: 'center'
          }}
        >
          <Paper elevation={5}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <ShoppingBasketIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Product
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="name"
                      required
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />

                    {/* <CircularProgress size={10} /> */}
                    <Button type="submit" fullWidth variant="contained">
                      Add Product
                    </Button>
                  </form>
                </Box>
              </Box>
            </Container>
          </Paper>
        </div>
      </Wrapper>
    </App>
  );
}
