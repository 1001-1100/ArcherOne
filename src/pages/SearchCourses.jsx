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

import ComboBox from '../components/ComboBox.jsx';
import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import groupArray from 'group-array';

import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

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

class SearchCourses extends Component {
    constructor(props){
      super(props);
      this.state = {
        fields: {},
        database: [],
        siteData: [],
        courseList: [],
        selectedCourses: [],
        loading: false,
      }
    }

    componentWillMount(){
        axios.get('/api/courses/')
        .then(res => {
            res.data.map(course => {
                var courses = this.state.courseList;
                courses.push({'id':course.id, 'course_code':course.course_code})
                this.setState({courseList: courses})
            })
        })
    }

    createData(classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled) {
      return { classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled };
    }

    handleChange = (field, e) => {
      let fields = this.state.fields;
      fields[field] = e.target.value;
      console.log(field);
      this.setState({fields});
    }

    handleFilter = (field, e) => {
      let option = e.target.value;

      let filteredList = [];

      if(option == "all"){
        console.log("all");
        filteredList = this.state.database;

        this.setState({siteData: filteredList});

        console.log(filteredList);
      }
      else if(option == "open"){
        console.log("open");

        var i;
        for(i = 0; i < this.state.database.length; i++) {
          if(this.state.database[i].enrolled < this.state.database[i].capacity){
            // console.log(this.state.database[i]);
            filteredList.push(this.state.database[i]);
          }
        }

        this.setState({siteData: filteredList});

        console.log(filteredList);
      }
      else{
        console.log("closed");

        var i;
        for(i = 0; i < this.state.database.length; i++) {
          if(this.state.database[i].enrolled >= this.state.database[i].capacity){
            // console.log(this.state.database[i]);
            filteredList.push(this.state.database[i]);
          }
        }

        this.setState({siteData: filteredList});

        console.log(filteredList);
      }

    }

    searchCourses = () =>{
      //start loading
      if(this.state.selectedCourses.length > 0){
        this.setState({loading: true});
      }
     
      this.setState({siteData: []})
      this.state.selectedCourses.map(course =>{
        axios.get('/api/courseofferingslist/'+course.id+'/')
        .then(res => {
            var arranged = groupArray(res.data, 'classnumber');
            console.log(arranged)
            for (let key in arranged) {
              console.log(key, arranged[key]);
              var days = []
              var day = ''
              var classnumber = ''
              var course = ''
              var section = ''
              var faculty = ''
              var timeslot_begin = ''
              var timeslot_end = ''
              var room = ''
              var max_enrolled = ''
              var current_enrolled = ''
              arranged[key].map(offering => {
                days.push(offering.day)
                classnumber = offering.classnumber
                course = offering.course
                section = offering.section
                faculty = offering.faculty
                timeslot_begin = offering.timeslot_begin
                timeslot_end = offering.timeslot_end
                room = offering.room
                max_enrolled = offering.max_enrolled
                current_enrolled = offering.current_enrolled
              })
              days.map(day_code => {
                day += day_code;
              })
              const newSiteData = this.state.siteData;
              const offering = this.createData(classnumber, course, section, faculty, day, timeslot_begin, timeslot_end, room, max_enrolled, current_enrolled);
              newSiteData.push(offering)
              this.setState({siteData: newSiteData})
              //Finish Loading
              this.setState({loading: false});
            }
        })
      })
    }

    handleSearch = (e, val) =>{
      this.setState({selectedCourses: val})
    }

    render() {
      const { classes } = this.props;

      const StyledTableCell = withStyles(theme => ({
        head: {
          backgroundColor: '#006A4E',
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles(theme => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
          },
        },
      }))(TableRow);

      return (
          <div>
            {this.props.menu()}

            <div className="search-container">

                <div className="searchBar">
                  <h2>Search all your courses in one go!</h2>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <ComboBox style={{width: "-webkit-fill-available"}} page="search" onChange={this.handleSearch} courseList={this.state.courseList} />
                      <div className={classes.root}>
                          <div className={classes.wrapper} >
                            <Button
                                  variant="contained"
                                  color = "Primary"
                                  disabled={this.state.loading}
                                  style={{backgroundColor: "green", color:"white", height:"55px"}}
                                  onClick={this.searchCourses}>
                                  <SearchIcon/>  
                            </Button>
                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                          </div>
                      </div>
                      
                    </div>
                    
                  
                </div>

                <div className="filters">
                    <center>
                      <span className="filterLabel">Filters:</span>
                      
                      <label className="radio-description" for="all">
                        <input type="radio" id="all" name="filter" value="all" onChange={this.handleFilter.bind(this, "filter")} />
                        All Sections
                      </label>

                      <label className="radio-description" for="open">
                        <input type="radio" id="open" name="filter" value="open" onChange={this.handleFilter.bind(this, "filter")} />
                        Open Sections
                      </label>

                      <label className="radio-description" for="closed">
                        <input type="radio" id="closed" name="filter" value="closed" onChange={this.handleFilter.bind(this, "filter")} />
                        Closed Sections
                      </label>
                    </center>
                </div>

                <div className="viewCourses">
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
                        {this.state.siteData.map(row => (
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
            </div>
        </div>        
      );
    }
  }

  SearchCourses.propTypes={
    classes: PropTypes.object.isRequired,
  };
    export default withStyles(styles)(SearchCourses);