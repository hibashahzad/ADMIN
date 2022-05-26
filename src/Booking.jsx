import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';

import App from './App';

import { Navigate, useParams, useNavigate } from 'react-router-dom';
import bookings from './Services/services/Booking';
import Swal from 'sweetalert2';

const Booking = () => {
  const [booking, setBooking] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const viewUser = (user) => {
    Swal.fire({
      title: 'Detail',
      html: `
          <div style="font-weight:bold">name:${user.Uname}</div>
          <div style="font-weight:bold">email:${user.Uemail}</div>
         
         
       
         
      `,

      confirmButtonText: 'Ok'
    });
  };
  const viewdetail = (user) => {
    Swal.fire({
      title: 'Detail',
      html: `
          <div style="font-weight:bold">name:${user.Sname}</div>
          <div style="font-weight:bold">Detail:${user.Sdetail}</div>
          <div style="font-weight:bold">Service Price:${user.Sprice}</div>
         
       
         
      `,

      confirmButtonText: 'Ok'
    });
  };
  React.useEffect(() => {
    try {
      bookings.getBooking().then((val) => {
        console.log(val);
        setBooking(
          val.Booking.map((value) => ({
            ...value,
            id: value._id,
            Sname: value?.ServiceId?.name,
            Sdetail: value?.ServiceId?.detail,
            Sprice: value?.ServiceId?.Price,
            Uname: value?.UserId?.name,
            Uemail: value.UserId?.email
          }))
        );
      });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  return (
    <App>
      <Button>Back</Button>
      <h3 style={{ textAlign: 'center' }}>Booking</h3>

      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          style={{
            width: '100%',
            color: 'green'
          }}
          columns={[
            {
              field: 'Price',
              width: 200
            },
            {
              field: 'Address',
              width: 300
            },
            {
              field: 'Building',
              width: 200
            },

            {
              field: 'City',
              width: 200
            },
            {
              field: 'State',
              width: 100
            },
            {
              field: 'Message',
              width: 200
            },
            {
              field: 'Date',
              width: 200
            },
            {
              field: 'Time',
              width: 100
            },
            {
              field: 'Status',
              headerName: 'Status',
              width: 100,
              filterable: false,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    {params.row.status == 0
                      ? 'Requested'
                      : params.row.status == 1
                      ? 'Payment Pending'
                      : params.row.status == 2
                      ? 'Rejected'
                      : 'Canceled'}
                  </div>
                );
              }
            },
            {
              field: 'Action',
              headerName: 'Action',
              width: 400,
              filterable: false,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    <Button
                      style={{ marginRight: '4px' }}
                      variant="contained"
                      color="primary"
                      onClick={() => viewdetail(params.row)}
                    >
                      View Service Detail
                    </Button>
                    <Button
                      style={{ marginRight: '4px' }}
                      variant="contained"
                      color="primary"
                      onClick={() => viewUser(params.row)}
                    >
                      View User
                    </Button>
                  </div>
                );
              }
            }
          ]}
          rows={booking}
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
export default Booking;
