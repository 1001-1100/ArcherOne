import React, { Component } from "react";
import { Column, Row } from 'simple-flexbox';
import Menu from '../components/Menu.jsx';
import '../css/SearchCourses.css';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

// import ComboBox from '../components/ComboBox.jsx';
// import axios from 'axios';

// import SearchIcon from '@material-ui/icons/Search';
// import Button from '@material-ui/core/Button';
// import groupArray from 'group-array';

// import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';

import ReactLoading from 'react-loading';
import Skeleton from '@material-ui/lab/Skeleton';

// import searchIMG from '../assets/search_engine.png';

// import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: 'relative',
    

  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    paddingTop: '5px',
    paddingBottom: '5px',
  },
});




class FriendTable extends Component {
    constructor(props){
      super(props);
      this.state = {
        dataReceived: false,
        skeletons: [...Array(4).keys()],
        loading: true,
        friendInfo: [{name: "Edward Elric", matched: "INOVATE S17, ALGOCOM S18", possible: "TREDTRI A51", unavailable: "SCIMATC"}, {name: "Mark Ruffalo", matched: "INOVATE S17", possible: "TREDFOR S18", unavailable: "LBYMATC"}],
      }

    }

    // componentDidMount(){
      
       
    // }

    createData(name, matched, possible, unavailable) {
      return { name, matched, possible, unavailable };
    }

    handleChange = (field, e) => {
      let fields = this.state.fields;
      fields[field] = e.target.value;
      this.setState({fields});
    }

    
  
    // toggleModal = () => {
    //   var openModalVar = this.state.openModalCourseInfo;
    //   this.setState({openModalCourseInfo: !openModalVar});
    // }

    render() {
      const { classes } = this.props;

      const StyledTableCell = withStyles(theme => ({
        head: {
          backgroundColor: '#006A4E',
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
          borderBottom: "1px solid white",
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles(theme => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
          },
          "&:hover": {
            backgroundColor: "#efefef"
          },
        },
      }))(TableRow);
      
      const loadedData = (index) => {
       
          if(this.state.friendInfo != undefined){
        
            return(
            <TableBody>
              {this.state.friendInfo.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell> {row.name} </StyledTableCell>
                    <StyledTableCell > {row.matched} </StyledTableCell>
                    <StyledTableCell > {row.possible} </StyledTableCell>
                    <StyledTableCell > {row.unavailable} </StyledTableCell>
                  </StyledTableRow>
         
              ))}
            </TableBody>
            )
          }else{
            return(
            <TableBody>
              <StyledTableRow>
                <StyledTableCell colSpan={9}>
                  <center><p>
                    Friends were not added
                  </p></center>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
            )
        }

      };

      return (
          <div>
           

            {true ? 
            <div className="friend-container">

                
                {/* start of table */}
                <div className="view-Friends" style={true ? {} : {display: "none"}}>
                  <TableContainer>

                    {/* {this.state.friendInfo.map(index => ( */}
                      <Table aria-label="customized table" style={{marginBottom: 25, marginTop: 25}} component={Paper}>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell> Friend </StyledTableCell>
                            <StyledTableCell> Matched Classes </StyledTableCell>
                            <StyledTableCell> Possible Classes </StyledTableCell>
                            <StyledTableCell> Clashing Courses </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        {false ? 
                        <TableBody>
                            {this.state.skeletons.map(skeleton =>(
                              <StyledTableRow>
                                <StyledTableCell> <Skeleton width={'100%'} height={'100%'}></Skeleton> </StyledTableCell>
                                <StyledTableCell> <Skeleton width={'100%'} height={'100%'}></Skeleton> </StyledTableCell>
                                <StyledTableCell> <Skeleton width={'100%'} height={'100%'}></Skeleton> </StyledTableCell>
                                <StyledTableCell> <Skeleton width={'100%'} height={'100%'}></Skeleton> </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                        : 
                        // <div></div>
                        loadedData("name")
                        }
                      </Table>
                    {/* ))} */}

                    </TableContainer>

              </div>                  
                
            </div>
                     
            : 
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
              <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
            </div> }
        </div>        
      );
    }
  }

  FriendTable.propTypes={
    classes: PropTypes.object.isRequired,
  };
    export default withStyles(styles)(FriendTable);