import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import App from './App';
import UerServices from './Services/services/UserServices';
import Swal from 'sweetalert2';
import { url } from './Services/services/url';

const BussnessUser = () => {
  const [user, setuser] = React.useState([]);

  React.useEffect(() => {
    UerServices.getbussnessUser().then((val) => {
      console.log(val);
      setuser(
        val.bussness.map((value) => ({
          ...value,
          id: value._id,
          _id: value.userId._id,
          name: value.userId.name,
          status: value.userId.status,
          email: value.userId.email,
          phoneno: value.userId.phoneNo,
          categoryName: value.categoryId?.name
        }))
      );
    });
  }, []);
  const changestatus = (id, status) => {
    UerServices.updateuser(id, status).then((val) => {
      setuser(
        user.map((value) =>
          value.userId._id == id ? { ...value, status: status } : value
        )
      );
      Swal.fire({
        title: 'Detail',
        text: status == 1 ? 'Approved' : 'Disaproved',

        confirmButtonText: 'Ok'
      });
    });
  };
  const viewdetail = (a, b, c, d, e, f) => {
    Swal.fire({
      title: 'Detail',
      html: `
          <div style="font-weight:bold">Address:${a}</div>
          <div style="font-weight:bold">Company Name:${b}</div>
          <div style="font-weight:bold">Status:${c}</div>
          <div style="font-weight:bold">Account Link:${d}</div>
          <div style="font-weight:bold">About:${e}</div>
          <img src="${url}${f}" width="25%" />
      `,

      confirmButtonText: 'Ok'
    });
  };
  return (
    <App>
      <Button>Back</Button>
      <h4 style={{ textAlign: 'center' }}>Bussness User</h4>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          top: 70,
          right: 16
        }}
      >
        <AddIcon />
      </Fab>
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          style={{
            width: '100%',
            color: 'green'
          }}
          columns={[
            { field: 'name', width: 160 },

            { field: 'phoneno', width: 200 },
            { field: 'email', width: 300 },

            { field: 'categoryName', width: 150 },

            {
              field: 'actions',
              headerName: 'Actions',
              width: 500,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    <Button
                      style={{ marginRight: '4px' }}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        viewdetail(
                          params.row.address,
                          params.row.bussnessname,

                          params.row.bussnessstatus,
                          params.row.accountLink,
                          params.row.about,
                          params.row.cnic
                        )
                      }
                    >
                      View Detail
                    </Button>

                    {params.row.status == 0 ? (
                      <>
                        <Button
                          style={{ marginRight: '4px' }}
                          variant="contained"
                          color="primary"
                          onClick={() => changestatus(params.row._id, 1)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => changestatus(params.row._id, 2)}
                        >
                          Disaaprove
                        </Button>
                      </>
                    ) : (
                      <Button
                        style={{ marginRight: '4px' }}
                        variant="contained"
                        color="primary"
                        disabled
                      >
                        {params.row.status == 1 ? 'Approved' : 'Disapproved'}
                      </Button>
                    )}
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
export default BussnessUser;
