import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import App from './App';
import Category from './Services/services/CategoryServices';
import { useNavigate, useParams } from 'react-router-dom';
import QuizP from './Services/services/quiz';
import Swal from 'sweetalert2';

const Quiz = () => {
  const [quiz, setQuiz] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const mode = !id;
  const edit = (edit) => {
    navigate('/palmist/edit/' + edit);
  };
  React.useEffect(() => {
    if (mode) {
      QuizP.getQuiz().then((val) => {
        console.log(val);
        setQuiz(
          val.quiz.map((value) => ({
            ...value,
            id: value._id,
            SubCategory: value.SubCategoryId?.name
          }))
        );
      });
    } else {
      QuizP.getSubQuiz(id).then((val) => {
        console.log(val);
        setQuiz(
          val.quiz.map((value) => ({
            ...value,
            id: value._id,
            SubCategory: value.SubCategoryId?.name
          }))
        );
      });
    }
  }, [id]);
  const viewdetail = (a, b, c, d) => {
    Swal.fire({
      title: 'Detail',
      html: `
          <div style="font-weight:bold">Question:${a}</div>
          <div style="font-weight:bold">Option:${b}</div>
          <div style="font-weight:bold">Option:${c}</div>
          <div style="font-weight:bold">Option:${d}</div>
         
      `,

      confirmButtonText: 'Ok'
    });
  };
  const del = (id) => {
    QuizP.deleteQuiz(id).then((value) => {
      setQuiz(quiz.filter((val) => val.id != id));
      Swal.fire({
        title: 'Delete Succesfully',
        text: 'Quiz is delete',

        confirmButtonText: 'Ok'
      });
    });
  };

  return (
    <App>
      <h3 style={{ textAlign: 'center' }}>Palmist Quiz</h3>

      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          style={{
            width: '100%',
            color: 'green'
          }}
          columns={[
            { field: 'Question', width: 400 },
            { field: 'SubCategory', width: 150 },

            {
              field: 'actions',
              headerName: 'Actions',
              width: 400,

              renderCell: (params) => {
                return (
                  <div style={{ width: '100%' }}>
                    <Button
                      style={{ marginRight: '4px' }}
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        viewdetail(
                          params.row.Question,
                          params.row.Answer1,

                          params.row.Answer2,
                          params.row.Answer3
                        )
                      }
                    >
                      View Detail
                    </Button>
                    <Button
                      style={{ marginRight: '4px' }}
                      variant="contained"
                      color="secondary"
                      onClick={() => edit(params.row.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ marginRight: '4px' }}
                      variant="contained"
                      color="secondary"
                      onClick={() => del(params.row.id)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              }
            }
          ]}
          rows={quiz}
          pageSize={8}
          components={{
            Toolbar: GridToolbar
          }}
        />
      </div>
    </App>
  );
};
export default Quiz;
