/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';

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
import ImageUploading from 'react-images-uploading';
import SubCategory from './Services/services/subCategorybyCategory';
import { url } from './Services/services/url';
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
    .string('Enter Name')

    .required('Name is required'),
  detail: yup.string('Enter Detail').required('Detail is required')
});
export default function AddEditSub() {
  const { id, Sub } = useParams();
  const [imageS, setImage] = React.useState('');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (Sub) {
      SubCategory.getSingleCategory(Sub).then((val) => {
        console.log(val);
        setInitialValue({
          name: val.subcategory.name,
          detail: val.subcategory.detail
        });
        setImage(val.subcategory.image);
      });
    }
  }, []);

  const [initialValue, setInitialValue] = React.useState({
    name: '',
    detail: ''
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!Sub) {
        if (images[0]) {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('detail', values.detail);
          formData.append('image', images[0].file);
          formData.append('categoryId', id);

          const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          };
          axios.post('http://localhost:3000/api/subcategory', formData, config);
          notify('SubCategory Uploaded');
          navigate(-1);
          // 625e92f6c79665679583d09b
          // try {
          //   Category.updateCategory(id, { name: values.name }).then((val) => {
          //     notifys('Updated');
          //   });
          // } catch (e) {
          //   notify(e.error);
          // }
        } else {
          notify('Please Upload Image');
        }
      } else {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('detail', values.detail);
        formData.append('image', images[0] ? images[0].file : imageS);
        formData.append('categoryId', id);

        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        if (images.length < 1) {
          axios
            .put('http://localhost:3000/api/subcategory/' + Sub, {
              detail: values.detail,
              name: values.name
            })
            .then((e) => {
              notify('Successfully Updated');
              navigate(-1);
            });
        } else {
          axios
            .put(
              'http://localhost:3000/api/subcategory/image/' + Sub,
              formData,
              config
            )
            .then((e) => {
              notify('Successfully Updated');
              navigate(-1);
            });
        }
        notify('SubCategory Uploaded');
      }
    }
  });

  // React.useEffect(() => {
  //   try {
  //     Category.getCategoryByid(id).then((val) => {
  //       setInitialValue({ name: val.category.name });
  //     });
  //   } catch (e) {
  //     notify(e.error);
  //   }
  // }, []);

  const notify = (error) =>
    toast(error, { position: 'top-left', type: 'error' });
  const notifys = (message) =>
    toast.success('🦄!' + message, {
      position: 'top-right',
      autoClose: 5000,
      theme: 'dark',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit

    setImages(imageList);
  };
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
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
                  Add SubCategory
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    sx={{
                      margin: '14px 0'
                    }}
                    id="name"
                    name="name"
                    label="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    fullWidth
                    id="detail"
                    name="detail"
                    label="detail"
                    value={formik.values.detail}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.detail && Boolean(formik.errors.detail)
                    }
                    helperText={formik.touched.detail && formik.errors.detail}
                  />

                  {/* <CircularProgress size={10} /> */}
                  <ImageUploading
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <button
                          type="button"
                          style={isDragging ? { color: 'red' } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Click or Drop here
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll} type="button">
                          Remove all images
                        </button>
                        {imageList.length > 0 ? (
                          imageList.map((image, index) => (
                            <div key={index} className="image-item">
                              <img src={image['data_url']} alt="" width="100" />
                              <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>
                                  Update
                                </button>
                                <button onClick={() => onImageRemove(index)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <img src={url + imageS} alt="" width="100" />
                        )}
                      </div>
                    )}
                  </ImageUploading>
                  <Button
                    type="submit"
                    fullWidth
                    color="secondary"
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
