import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';

import App from './App';

import { Navigate, useParams, useNavigate } from 'react-router-dom';


const Booking = () => {
  const [booking, setBooking] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

 
  React.useEffect(() => {
    try {
   
        Booking.getBooking().then((val) => {
          setBooking(
            val.booking.map((value) => ({
              ...value,
              id: value._id,
            
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
            { field: 'name', width: 160 },
            {
              field: 'Price',
              width: 200
            },
            {
              field: 'Address',
              width: 200
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
                width: 200
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
                width: 200
              },
         
         
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
