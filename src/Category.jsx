import React from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import App from "./App";
import Category from './Services/services/CategoryServices';


const CategoryPage = () => {
  const [category, setcategory] = React.useState([]);

  React.useEffect(() => {
    Category.getCategory().then((val) => {
      setcategory( 
        val.category.map((value) => ({
          ...value,
          id: value._id,
        }))
      );
    });
  }, []);

  return (
    <App>
      <Button>Back</Button>
      <h3 style={{ textAlign: "center" }}>Category</h3>
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
       
          }}
          columns={[
            { field: "name", width: 160 },

           
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
          rows={category}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </App>
  );
};
export default CategoryPage;
