import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ScheduleView from '../components/ScheduleView';
import '../css/Index.css'
import SavedSchedule from '../components/SavedSchedule';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

class SchedViewHome extends Component {
    state = {  }
    render() { const StyledTableCell = withStyles(theme => ({
        head: {
          backgroundColor: '#006A4E',
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 12,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles(theme => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
          },
        },
      }))(TableRow);
      
      function createData(classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled) {
        return { classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled };
      }
      
      const rows = [
        createData(2258, 'INOVATE', 'S17', 'DELA CRUZ, JUAN', 'TH', '12:45', '14:15', 'GK210', 45, 45),
        createData(2259, 'INOVATE', 'S18', 'DELA CRUZ, JUAN', 'TH', '14:30', '16:00', 'GK210', 45, 40),
        createData(2043, 'TREDTRI', 'S17', 'TORRES, MARIA', 'TH', '14:30', '16:00', 'GK301', 30, 30),
        createData(2044, 'TREDTRI', 'S18', 'TORRES, MARIA', 'TH', '12:45', '14:15', 'GK301', 30, 28)
      ];
        return (
          // <div class='savedSchedContent' style={{block: "display"}}>
          //   <Grid container spacing={3}>
          //   </Grid>
          //     <Grid item xs={1}>
          //     <Grid item xs={10}>
          //       <center><SavedSchedule/></center>
          //     </Grid>
          //     <Grid item xs={1}>
                

          //     </Grid>
          //     <Grid item xs={12}>
          //     <div className="viewCoursesHome">
          //               <TableContainer component={Paper}>
          //                 <Table aria-label="customized table">
          //                   <TableHead>
          //                     <TableRow>
          //                       <StyledTableCell> Class Number </StyledTableCell>
          //                       <StyledTableCell> Course </StyledTableCell>
          //                       <StyledTableCell> Section </StyledTableCell>
          //                       <StyledTableCell> Faculty </StyledTableCell>
          //                       <StyledTableCell> Day </StyledTableCell>
          //                       <StyledTableCell> Time </StyledTableCell>
          //                       <StyledTableCell> Room </StyledTableCell>
          //                       <StyledTableCell> Capacity </StyledTableCell>
          //                       <StyledTableCell> Enrolled </StyledTableCell>
          //                     </TableRow>
          //                   </TableHead>
          //                   <TableBody>
          //                     {rows.map(row => (
          //                       <StyledTableRow key={row.classNmbr}>
          //                         <StyledTableCell> {row.classNmbr} </StyledTableCell>
          //                         <StyledTableCell> {row.course} </StyledTableCell>
          //                         <StyledTableCell> {row.section} </StyledTableCell>
          //                         <StyledTableCell> {row.faculty} </StyledTableCell>
          //                         <StyledTableCell> {row.day} </StyledTableCell>
          //                         <StyledTableCell> {row.startTime} - {row.endTime} </StyledTableCell>
          //                         <StyledTableCell> {row.room} </StyledTableCell>
          //                         <StyledTableCell align="right"> {row.capacity} </StyledTableCell>
          //                         <StyledTableCell align="right"> {row.enrolled} </StyledTableCell>
          //                       </StyledTableRow>
          //                     ))}
          //                   </TableBody>
          //                 </Table>
          //               </TableContainer>
          //             </div>
          //     </Grid>
          //   </Grid>
          // </div>
            <Row horizontal="center">
                <Column flexShrink={1}>
                  <div class='savedSchedContent' style={{block: "display"}}>
                    <center><SavedSchedule/></center>
                  
                  <Row horizontal='center' flexShrink={1}>
                    <div className="viewCoursesHome">
                      <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell> Class Number </StyledTableCell>
                              <StyledTableCell> Course </StyledTableCell>
                              <StyledTableCell> Section </StyledTableCell>
                              <StyledTableCell> Faculty </StyledTableCell>
                              <StyledTableCell> Day </StyledTableCell>
                              <StyledTableCell> Time </StyledTableCell>
                              <StyledTableCell> Room </StyledTableCell>
                              <StyledTableCell> Capacity </StyledTableCell>
                              <StyledTableCell> Enrolled </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map(row => (
                              <StyledTableRow key={row.classNmbr}>
                                <StyledTableCell> {row.classNmbr} </StyledTableCell>
                                <StyledTableCell> {row.course} </StyledTableCell>
                                <StyledTableCell> {row.section} </StyledTableCell>
                                <StyledTableCell> {row.faculty} </StyledTableCell>
                                <StyledTableCell> {row.day} </StyledTableCell>
                                <StyledTableCell> {row.startTime} - {row.endTime} </StyledTableCell>
                                <StyledTableCell> {row.room} </StyledTableCell>
                                <StyledTableCell align="right"> {row.capacity} </StyledTableCell>
                                <StyledTableCell align="right"> {row.enrolled} </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Row>
                </div>
                </Column>
            </Row>
           
  
        );
    }
}
 
export default SchedViewHome;