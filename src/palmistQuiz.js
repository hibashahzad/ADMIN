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
import { useParams } from 'react-router-dom';
import Category from './Services/services/CategoryServices';
import QuizP from './Services/services/quiz';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const validationSchema = yup.object({
  Question: yup
    .string('Enter Question')

    .required('Question is required'),
  Answer1: yup
    .string('Enter Category')

    .required('Answer is required'),
  Answer2: yup
    .string('Enter Category')

    .required('Answer is required'),
  Answer3: yup
    .string('Enter Category')

    .required('Answer is required')
});
export default function PalmistQuiz() {
  const { id, sub } = useParams();
  const [loading, setloading] = React.useState(false);
  const [initialValue, setInitialValue] = React.useState({
    Question: '',
    Answer1: '',
    Answer2: '',
    Answer3: ''
  });
  React.useEffect(() => {
    if (sub) {
      QuizP.getSingleQuiz(sub).then((val) => {
        const { Question, Answer1, Answer2, Answer3 } = val.quiz;
        setInitialValue({ Question, Answer1, Answer2, Answer3 });
      });
    }
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // 625e92f6c79665679583d09b

      try {
        if (!sub) {
          QuizP.createQuiz({
            Question: values.Question,
            Answer1: values.Answer1,
            Answer2: values.Answer2,
            Answer3: values.Answer3,
            SubCategoryId: id
          }).then((val) => {
            resetForm();
            notify('Quiz Added');
          });
        } else {
          QuizP.updateQuiz(sub, {
            Question: values.Question,
            Answer1: values.Answer1,
            Answer2: values.Answer2,
            Answer3: values.Answer3
          }).then((val) => {
            notify('Quiz updated');
          });
        }
      } catch (e) {
        alert(e.error);
      }
    }
  });

  const notify = (error) =>
    toast(error, { position: 'top-left', type: 'error' });

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
                  Palmist Quiz
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    id="Question"
                    name="Question"
                    label="Question"
                    value={formik.values.Question}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.Question && Boolean(formik.errors.Question)
                    }
                    helperText={
                      formik.touched.Question && formik.errors.Question
                    }
                  />
                  <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    id="name"
                    name="Answer1"
                    label="Answer1"
                    value={formik.values.Answer1}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.Answer1 && Boolean(formik.errors.Answer1)
                    }
                    helperText={formik.touched.Answer1 && formik.errors.Answer1}
                  />
                  <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    id="Answer2"
                    name="Answer2"
                    label="Answer2"
                    value={formik.values.Answer2}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.Answer2 && Boolean(formik.errors.Answer2)
                    }
                    helperText={formik.touched.Answer2 && formik.errors.Answer2}
                  />
                  <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    id="Answer3"
                    name="Answer3"
                    label="Answer3"
                    value={formik.values.Answer3}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.Answer3 && Boolean(formik.errors.Answer3)
                    }
                    helperText={formik.touched.Answer3 && formik.errors.Answer3}
                  />

                  {/* <CircularProgress size={10} /> */}
                  <Button
                    style={{ marginTop: '10px' }}
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
