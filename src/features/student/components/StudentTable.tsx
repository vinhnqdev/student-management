import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Student } from '../../../models';
import { useTheme } from '@mui/material/styles';
import { useHistory, useRouteMatch } from 'react-router';

export interface StudentTableProps {
  listStudent: Array<Student>;
  onRemove: (id: string) => void;
}

function StudentTable({ listStudent, onRemove }: StudentTableProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [removeId, setRemoveId] = useState('');
  const routeMatch = useRouteMatch();
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const lgMediaQuery = useMediaQuery('(max-width:1180px)');

  const handleOpenDialog = (removeid: string) => {
    setIsOpenDialog(true);
    setRemoveId(removeid);
  };

  const handleRemove = () => {
    setIsOpenDialog(false);
    onRemove(removeId);
  };

  const handleEditRedirect = (id: string) => {
    history.push(`${routeMatch.path}/${id}`);
  };

  return (
    <>
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
          aria-labelledby="remove-student-dialog"
        >
          <DialogTitle id="remove-student-dialog">{'Remove a student?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Click Agree Button to be sure that you want to remove this student.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setIsOpenDialog(false)}>
              Disagree
            </Button>
            <Button onClick={handleRemove} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">City</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="right">Mark</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listStudent.map((student) => (
              <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {student.id}
                </TableCell>
                <TableCell align="left">{student.name}</TableCell>
                <TableCell align="left">{student.city}</TableCell>
                <TableCell align="left">{student.gender}</TableCell>
                <TableCell align="center">{student.age}</TableCell>
                <TableCell align="right">{student.mark}</TableCell>
                <TableCell
                  align="left"
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    fullWidth={lgMediaQuery}
                    color="primary"
                    variant="contained"
                    onClick={() => handleEditRedirect(student.id as string)}
                  >
                    Edit
                  </Button>
                  <Button
                    fullWidth={lgMediaQuery}
                    color="error"
                    variant="outlined"
                    onClick={() => handleOpenDialog(student.id as string)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StudentTable;
