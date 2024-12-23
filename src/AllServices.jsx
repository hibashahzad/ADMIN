import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import App from './App';
import DetailsIcon from '@mui/icons-material/Details';
import Category from './Services/services/CategoryServices';
import SubCategory from './Services/services/subCategorybyCategory';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { url } from './Services/services/url';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import Services from './Services/services/Service';

const AllServices = () => {
  const [service, setServices] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const mode = !id;
  const viewdetail = (user) => {
    Swal.fire({
      title: 'Detail',
      html: `
          <div style="font-weight:bold">name:${user.name}</div>
          <div style="font-weight:bold">Email:${user.email}</div>
          <div style="font-weight:bold">PhoneNo:${user.phoneNo}</div>
          <div style="font-weight:bold">Detail:${user.detail}</div>
       
         
      `,

      confirmButtonText: 'Ok'
    });
  };
  // const palmist = (id) => {
  //   navigate(`/palmist/${id}`);
  // };
  // const quiz = (id) => {
  //   navigate(`/Quiz/${id}`);
  // };
  React.useEffect(() => {
    try {
      if (!mode) {
        Services.getuserServices(id).then((val) => {
          setServices(
            val.userServices.map((value) => ({
              ...value,
              id: value._id,
              email: value.userid?.email,
              name: value.userid?.name,
              PhoneNo: value.userid?.PhoneNo
            }))
          );
        });
      } else {
        Services.getService().then((val) => {
          setServices(
            val.userServices.map((value) => ({
              ...value,
              id: value._id,
              email: value.userid?.email,
              name: value.userid?.name,
              phoneNo: value.userid?.phoneNo
            }))
          );
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);
  const deleteDervice = (id) => {
    Services.deleteService(id).then((value) => {
      setServices(service.filter((val) => val.id != id));
      Swal.fire({
        title: 'Delete Succesfully',
        text: 'Service is deleted',

        confirmButtonText: 'Ok'
      });
    });
  };
  return (
    <App>
      <h3 style={{ textAlign: 'center' }}>Service</h3>

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
              field: 'serviceCode',
              width: 300
            },
            {
              field: 'Price',
              width: 200
            },

            {
              field: 'ServiceType',
              headerName: 'Image',
              width: 150,
              filterable: false,

              renderCell: (params) => {
                return <img src={url + params.row.image} width="150" />;
              }
            },
            {
              field: 'Action',
              headerName: 'Action',
              width: 300,
              filterable: false,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    <DetailsIcon
                      style={{ marginRight: '4px',cursor:'pointer' ,fontSize:"30px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => viewdetail(params.row)}
                    >
                      View Detail
                    </DetailsIcon>
                    <DeleteIcon
                      style={{ marginRight: '4px',cursor:'pointer',fontSize:"30px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteDervice(params.row.id)}
                    >
                      Delete Service
                    </DeleteIcon>
                  </div>
                );
              }
            }
          ]}
          rows={service}
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
export default AllServices;
