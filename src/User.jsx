import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import App from "./App";
import UerServices from "./Services/services/UserServices";

const User = () => {
  const [user, setuser] = React.useState([]);

  React.useEffect(() => {
    UerServices.getUser().then((val) => {
      setuser(
        val.user.map((value) => ({
          ...value,
          id: value._id,
        }))
      );
    });
  }, []);

  return (
    <App>
      <Button>Back</Button>
      <h3 style={{ textAlign: "center" }}>User</h3>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          top: 70,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
      <div style={{ width: "100%"}}>
        <DataGrid
          autoHeight
          style={{
            width: "100%",
            color: "green",
            backgroundColor:'#EAD8D5'
          }}
          columns={[
            { field: "name", width: 160 },

            { field: "phoneNo", width: 300 },
            { field: "email", width: 300 },
         
            {
              field: "actions",
              headerName: "Actions",
              width: 400,

              renderCell: (params) => {
                return (
                  <div style={{ width: "100%" }}>
                    <Button
                      style={{ marginRight: "4px" }}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                    <Button  style={{ marginRight: "4px" }} variant="contained" color="primary">
                      Edit
                    </Button>
                    <Button variant="contained" color="primary">
                      View Bookings
                    </Button>
                  </div>
                );
              },
            },
          ]}
          rows={user}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </App>
  );
};
export default User;
