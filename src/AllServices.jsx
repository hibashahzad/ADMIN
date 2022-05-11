import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import App from "./App";
import Category from "./Services/services/CategoryServices";
import SubCategory from "./Services/services/subCategorybyCategory";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { url } from "./Services/services/url";
import Swal from "sweetalert2";
import Services from "./Services/services/Service";

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
          <div style="font-weight:bold">Email:${user.Email}</div>
          <div style="font-weight:bold">PhoneNo:${user.Phone}</div>
       
         
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
        Services.getService(id).then((val) => {
          setServices(
            val.userServices.map((value) => ({
              ...value,
              id: value._id,
              email: value.userid?.email,
              name: value.userid?.name,
              PhoneNo:value.userid?.PhoneNo
             
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
              PhoneNo:value.userid?.PhoneNo
            }))
          );
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);
  const deleteDervice = (id) => {
    Services.deleteSub(id).then((value) => {
      setServices(service.filter((val) => val.id != id));
      Swal.fire({
        title: "Delete Succesfully",
        text: "Sub Category is delete",

        confirmButtonText: "Ok",
      });
    });
  };
  return (
    <App>
      <Button>Back</Button>
      <h3 style={{ textAlign: "center" }}>Service</h3>

      <div style={{ width: "100%" }}>
        <DataGrid
          autoHeight
          style={{
            width: "100%",
            color: "green",
          }}
          columns={[
            { field: "name", width: 160 },
            {
              field: "serviceCode",
              width: 300,
            },
            {
              field: "Price",
              width: 200,
            },

            {
              field: "ServiceType",
              headerName: "Image",
              width: 150,
              filterable: false,

              renderCell: (params) => {
                return <img src={url + params.row.image} width="150" />;
              },
            },
            {
              field: "Action",
              headerName: "Action",
              width: 300,
              filterable: false,

              renderCell: (params) => {
                return (
                  <div style={{ width: "100%" }}>
                    <Button
                      style={{ marginRight: "4px" }}
                      variant="contained"
                      color="primary"
                      onClick={()=>viewdetail(params.row)}
                    >
                      View Detail
                    </Button>
                    <Button
                      style={{ marginRight: "4px" }}
                      variant="contained"
                      color="secondary"
                      onClick={()=>deleteDervice(params.row)}
                    >
                      Delete Service
                    </Button>
                  </div>
                );
              },
            },
          
          ]}
          rows={service}
          pageSize={8}
          rowsPerPageOptions={[5, 10, 25]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </App>
  );
};
export default AllServices;
