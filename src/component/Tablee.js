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
  { id: '번호', label: '번호', minWidth: 15 },
  { id: '제목', label: '제목', minWidth: 150 },
  {
    id: '작성자',
    label: '작성자',
    minWidth: 15,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '조회수',
    label: '조회수',
    minWidth: 10,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '작성일',
    label: '작성일',
    minWidth: 10,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '프로그램',
    label: '',
    minWidth: 0,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(번호, 제목, 작성자, 조회수, 작성일,프로그램) {
  return { 번호, 제목, 작성자, 조회수, 작성일, 프로그램 };
}

const rows_origin = [];
var count = 0;

const useStyles =makeStyles((theme) => ({
  root: { 
    flexGrow: 1,
    width: '100%',
  },
  container: {
    maxHeight: '100%',
  },
  divider: {
    height: 28,
    margin: 4,
  }, 
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
        console.log('카운트: ' + count);
        const temp = [];
        if (props.programs !== ''|| props.searchs !== '') {
          for (let i = 0; i < rows_origin.length; i++) {
            if (rows_origin[i].프로그램 === props.programs && (rows_origin[i].제목.includes(props.searchs) || rows_origin[i].작성자.includes(props.searchs)) ) 
            {
              temp.push(rows_origin[i]);
            }
          }
          setRows(temp);
        } else {
          setRows(rows_origin);
        }
      })
    } else {
      const temp = [];
      if (props.programs !== ''|| props.searchs !== '') {
        for (let i = 0; i < rows_origin.length; i++) {
          if (rows_origin[i].프로그램 === props.programs && (rows_origin[i].제목.includes(props.searchs) || rows_origin[i].작성자.includes(props.searchs)) ) 
          {
            temp.push(rows_origin[i]);
          }
        }
        setRows(temp);
      } else {
        setRows(rows_origin);
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
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} component={Link} to={`/${ row.번호}-${ row.프로그램}`} style={{textDecoration:"none", color:"black"}}>
        
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

      {props.programs}{props.searchs}
     

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