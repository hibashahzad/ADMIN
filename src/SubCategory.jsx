import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import App from './App';
import Category from './Services/services/CategoryServices';
import SubCategory from './Services/services/subCategorybyCategory';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { url } from './Services/services/url';
import Swal from 'sweetalert2';
import CreateIcon from '@mui/icons-material/Create';
import QuizIcon from '@mui/icons-material/Quiz';
import EditIcon from '@mui/icons-material/Edit';
import DetailsIcon from '@mui/icons-material/Details';
import DeleteIcon from '@mui/icons-material/Delete';

const SubCateg = () => {
  const [category, setcategory] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const mode = !id;
  const editS = (id, sub) => {
    navigate(`/AddSub/${sub}/${id}`);
  };
  const palmist = (id) => {
    navigate(`/palmist/${id}`);
  };
  const quiz = (id) => {
    navigate(`/Quiz/${id}`);
  };
  React.useEffect(() => {
    try {
      if (!mode) {
        SubCategory.getSubCategoryByCategory(id).then((val) => {
          setcategory(
            val.subcategory.map((value) => ({
              ...value,
              id: value._id,
              Category: value.categoryId?.name
            }))
          );
        });
      } else {
        SubCategory.getSubCategory().then((val) => {
          setcategory(
            val.subcategory.map((value) => ({
              ...value,
              id: value._id,
              Category: value.categoryId.name,
              Categoryid: value.categoryId._id
            }))
          );
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);
  const deleteS = (id) => {
    SubCategory.deleteSub(id).then((value) => {
      setcategory(category.filter((val) => val.id != id));
      Swal.fire({
        title: 'Delete Succesfully',
        text: 'Sub Category is delete',

        confirmButtonText: 'Ok'
      });
    });
  };
  return (
    <App>
      <h3 style={{ textAlign: 'center' }}>Category</h3>

      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          style={{
            width: '100%',
            color: 'green'
          }}
          columns={[
            { field: 'name', width: 160 },

            {
              field: 'Category',
              width: 200
            },

            {
              field: 'Image',
              headerName: 'Image',
              width: 150,
              filterable: false,

              renderCell: (params) => {
                return <img src={url + params.row.image} width="150" />;
              }
            },
            {
              field: 'Palmist Quiz',
              headerName: 'Palmist',
              width: 100,
              filterable: false,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    <QuizIcon
                      style={{ marginRight: '4px', cursor: 'pointer',fontSize:"30px" ,cursor:"pointer"}}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        quiz(params.row.id);
                      }}
                    >
                      View Quiz
                    </QuizIcon>

                    <CreateIcon
                      style={{ marginRight: '4px', cursor: 'pointer',fontSize:"30px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        palmist(params.row.id);
                      }}
                    >
                      Add PalmistQuiz
                    </CreateIcon>
                  </div>
                );
              }
            },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 300,
              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    <DetailsIcon
                      style={{ marginRight: '4px',fontSize:"30px" ,cursor:"pointer"}}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        Swal.fire({
                          title: 'Detail',
                          text: params.row.detail,

                          confirmButtonText: 'Ok'
                        });
                      }}
                    >
                      View Detail
                    </DetailsIcon>
                    <DeleteIcon
                      style={{ marginRight: '4px', fontSize:"30px" ,cursor:"pointer"}}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        deleteS(params.row.id);
                      }}
                    >
                      Delete
                    </DeleteIcon>

                    <EditIcon
                      style={{ marginRight: '4px',fontSize:"30px" ,cursor:"pointer"}}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        editS(params.row.id, params.row.Categoryid);
                      }}
                    >
                      Edit
                    </EditIcon>
                  </div>
                );
              }
            }
          ]}
          rows={category}
          pageSize={8}
          rowsPerPageOptions={[5, 10, 25]}
          components={{
            Toolbar: GridToolbar
          }}
        />
      </div>
    </App>
  );
};
export default SubCateg;
