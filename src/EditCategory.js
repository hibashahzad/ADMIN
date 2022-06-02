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

import Container from '@mui/material/Container';
import { CircularProgress, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useParams, useNavigate } from 'react-router-dom';
import Category from './Services/services/CategoryServices';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const validationSchema = yup.object({
  name: yup
    .string('Enter Category')

    .required('Category is required')
});
export default function AddEditCategory() {
  const { id } = useParams();
  const [loading, setloading] = React.useState(false);
  const [initialValue, setInitialValue] = React.useState({ name: '' });
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // 625e92f6c79665679583d09b

      try {
        Category.updateCategory(id, { name: values.name }).then((val) => {
          notify('Successfully Updated');
          navigate(-1);
        });
      } catch (e) {
        alert(e.error);
      }
    }
  });
  const notify = (error) =>
    toast(error, { position: 'top-left', type: 'error' });
  React.useEffect(() => {
    try {
      Category.getCategoryByid(id).then((val) => {
        setInitialValue({ name: val.category.name });
      });
    } catch (e) {
      notify(e.error);
    }
  }, []);

  return (
    <App>
      <Wrapper>
        <div
          style={{
            margin: '7px 0',
            display: 'flex',
            height: '100vh',
            alignItems: 'center'
          }}
        >
          <Paper elevation={10} sx={{ backgroundColor: 'transparent' }}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <ShoppingBasketIcon />
                </Avatar>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    margin: '14px 0'
                  }}
                >
                  Edit Category
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  {/* <CircularProgress size={10} /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      margin: '14px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Container>
          </Paper>
        </div>
      </Wrapper>
    </App>
  );
}
