import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";

const columns = [
  { number: 'titles', label: '제목', minWnumberth: 150 },
  {
    number: 'editor',
    label: '작성자',
    minWnumberth: 15,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    number: 'count',
    label: '조회수',
    minWnumberth: 10,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    number: 'date',
    label: '날짜',
    minWnumberth: 10,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(number, titles, editor, count, date,program) {
  return { number, titles, editor, count, date, program };
}

const rows_origin = [];
var count = 0;

const useStyles =makeStyles((theme) => ({
  root: { 
    flexGrow: 1,
    wnumberth: '100%',
  },
  container: {
    maxHeight: '100%',
  },
  divnumberer: {
    height: 28,
    margin: 4,
  }, 
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWnumberth: 120,
  },
}));

export default function Tablee(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  

  useEffect(() => {
    if (count === 0) {
      fetch('http://localhost:3001/board/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        })
      })
      .then(res=>res.json())
      .then(res=>{
        count++;
        for (let i = 0; i < res.length; i++) {
          rows_origin.push(createData(
            res[i].IDX,
            res[i].TITLE,
            res[i].ID,
            res[i].VIEW_COUNT,
            res[i].POST_DATE,
            res[i].PROGRAM
          ));
        }
      })
      .then(()=>{
        setRows(rows_origin);
      })
    } else {
      const temp = [];
      if(props.sel==='1'){//noticeboard
        if (props.programs !== ''|| props.searchs !== '') {
          for (let i = 0; i < rows_origin.length; i++) {
            if (props.programs == '' &&
            (rows_origin[i].titles.includes(props.searchs) ||
            rows_origin[i].editor.includes(props.searchs)) ) {
              temp.push(rows_origin[i]);
            } else if (rows_origin[i].program === props.programs &&
              (rows_origin[i].titles.includes(props.searchs) ||
              rows_origin[i].editor.includes(props.searchs)) ) {
              temp.push(rows_origin[i]);
            }
          }
          setRows(temp);
        } else {
          //setRows(rows_origin);
        }
    }else if(props.sel==='2'){//mywrite 내가 작성한 글만 보기
      if (props.programs !== '전체'|| props.searchs !== '') {
        for (let i = 0; i < rows_origin.length; i++) {
          if (props.programs == '전체' &&
          (rows_origin[i].titles.includes(props.searchs) ||
          rows_origin[i].editor.includes(props.searchs)) && 
          localStorage.getItem('username')===rows_origin[i].editor ) {
            temp.push(rows_origin[i]);
          } else if (rows_origin[i].program === props.programs &&
            (rows_origin[i].titles.includes(props.searchs) ||
            rows_origin[i].editor.includes(props.searchs)) && 
            localStorage.getItem('username')===rows_origin[i].editor) {
            temp.push(rows_origin[i]);
          }
        }
        setRows(temp);
      } else {
        for (let i = 0; i < rows_origin.length; i++) {
          if (props.programs == '전체' &&
          (rows_origin[i].titles.includes(props.searchs) ||
          rows_origin[i].editor.includes(props.searchs)) && 
          localStorage.getItem('username')===rows_origin[i].editor ) {
            temp.push(rows_origin[i]);
          } 
        }
        //setRows(rows_origin);//전체일때
        setRows(temp);
      }

    }
  }
  }, [props.programs, props.searchs])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div >
      

    <Paper className={classes.root}>
     
    <TableContainer className={classes.container} >
        <Table stickyHeader aria-label="sticky table"  >
          <TableHead >
            <TableRow  >
              {columns.map((column) => (
                <TableCell 
                  key={column.number}
                  align={column.align}
                  style={{ minWnumberth: column.minWnumberth }}
                 >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.number];
                    return (
                      <TableCell
                      key={column.number}
                      align={column.align}
                      component={Link}
                      to={`board_detail?numberx=${row.number}`}
                      style={{textDecoration:"none", color:"black"}}>
        
                      {(column.format && typeof value === 'number') ? column.format(value) : value}
                   
                    </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> 


      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>

 
    </div>


  );
}