import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import App from './App';
import DeleteIcon from '@mui/icons-material/Delete';
import UerServices from './Services/services/UserServices';
import Swal from 'sweetalert2';


const User = () => {
  const [user, setuser] = React.useState([]);

  React.useEffect(() => {
    UerServices.getUser().then((val) => {
      setuser(
        val.user
          .filter((filter) => filter.role == 'user')
          .map((value) => ({
            ...value,
            id: value._id
          }))
      );
    });
  }, []);

  const deleteS = (id) => {
    UerServices.deleteuser(id).then((value) => {
      setuser(user.filter((val) => val.id != id));
      Swal.fire({
        title: 'Delete Succesfully',
        text: 'User is delete',

        confirmButtonText: 'Ok'
      });
    });
  };
  return (
    <App>
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          style={{
            width: '100%',
            color: 'green'
          }}
          columns={[
            { field: 'name', width: 160 },

            { field: 'phoneNo', width: 300 },
            { field: 'email', width: 300 },

            {
              field: 'actions',
              headerName: 'Actions',
              width: 400,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    <DeleteIcon
                      style={{ marginRight: '4px', Color: '#A715C0',cursor:"pointer" ,fontSize:"30px"}}
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteS(params.row.id)}
                    >
                      Delete
                    </DeleteIcon>
                  </div>
                );
              }
            }
          ]}
          rows={user}
          pageSize={8}
          components={{
            Toolbar: GridToolbar
          }}
        />
      </div>
    </App>
  );
};
export default User;
