import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import App from './App';
import Category from './Services/services/CategoryServices';
import { useNavigate } from 'react-router-dom';
import DetailsIcon from '@mui/icons-material/Details';

import EditIcon from '@mui/icons-material/Edit';
const CategoryPage = () => {
  const [category, setcategory] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    Category.getCategory().then((val) => {
      setcategory(
        val.category.map((value) => ({
          ...value,
          id: value._id
        }))
      );
    });
  }, []);
  const Add = (id) => {
    navigate('/AddSub/' + id);
  };
  const Edit = (id) => {
    navigate('/Edit/' + id);
  };
  const view = (id) => {
    navigate('/SubCat/' + id);
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
              field: 'actions',
              headerName: 'Actions',
              width: 600,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    <DetailsIcon
                      style={{ marginRight: '4px',fontSize:"30px" ,cursor:"pointer"}}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        view(params.row.id);
                      }}
                    >
                      View SubCategories
                    </DetailsIcon>
                    <AddIcon
                      style={{ marginRight: '4px' ,fontSize:"30px",cursor:"pointer" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        Add(params.row.id);
                      }}
                    >
                      Add SubCategory
                    </AddIcon>

                    <EditIcon
                      style={{ marginRight: '4px',fontSize:"30px",cursor:"pointer" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        Edit(params.row.id);
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
          components={{
            Toolbar: GridToolbar
          }}
        />
      </div>
    </App>
  );
};
export default CategoryPage;
