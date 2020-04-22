import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import {Input} from 'reactstrap';
import Menu from '../components/Menu.jsx';
import CourseDnD from '../components/CourseDnD';
import '../css/GenerateSchedule.css';
import GenSchedInfo from '../components/GenSchedInfo';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ReactLoading from 'react-loading';
import ComboBox from '../components/ComboBox.jsx';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonProgress: {
    //   color: green[500],
      position: 'absolute',
      top: '65%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    buttonProgressSave: {
        //   color: green[500],
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -12,
          marginLeft: -12,
        },
    schedButton:{
        textTransform: "none",
        borderRadius: "25px",
        padding: "10px",
        paddingLeft: "30px",
        paddingRight: "30px",
        backgroundColor: "#16775D",
        border: "none",
        color: "white",
        boxShadow: "6px 5px #e8f4ea",
        borderStyle: "solid",
        borderColor: "#16775D",
        marginTop: "20px",
        '&:hover': {
            backgroundColor: "white",
            color: "#16775D"
          },
    }
  });

class GenerateSchedule extends Component {

    constructor(props) {
        super(props);
        this.updateHighPriority = this.updateHighPriority.bind(this);
        this.updateLowPriority = this.updateLowPriority.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.generatedRef = React.createRef();
        this.handleScrollToGen = this.handleScrollToGen.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);
        // this.updateSchedTitle = this.updateSchedTitle.bind(this);
        this.state = {
            highPriorityId: "1",
            lowPriorityId: "2",
            value: "",
            highCourses: [],
            lowCourses: [],
            courseList: [],
            currentPage: 0,
            currentContent: "",
            currentCourse: "",
            generatedContents: [],
            // generatedContents : ['Hello', 'There', 'Josh'],
            // currentContent: ['Hello'],
            pagesCount: 1,
            searchedCourse: "",
            hideGenContent:true,
            savedScheds: [],
            saveButtonLabel: "Save Schedule",
            saveButtonStyle: {margin: "30px"},
            AutoCompleteValue: [],
            schedules: [],
            dataReceived: false,

            snackBar: false,
            loading: false,
            success: false,
            courseAdded: true,
     
        };

    }

    componentDidMount(){
        const id = localStorage.getItem('user_id');
        axios.get('https://archerone-backend.herokuapp.com/api/courses/')
        .then(res => {
            res.data.map(course => {
                var courses = this.state.courseList;
                var addCourse = {'id':course.id,'course_code':course.course_code}
                courses.push(addCourse)
                this.setState({courseList: courses})
            })
            axios.get('https://archerone-backend.herokuapp.com/api/courseprioritylist/'+id+'/')
            .then(res => {
                console.log(res.data)
                res.data.map(coursepriority => {
                    const id = coursepriority.id
                    const priority = coursepriority.priority
                    var newCourseList = []
                    this.state.courseList.map(course =>{
                        if(course.id == coursepriority.courses){
                            if(priority){
                                var courses = this.state.highCourses;
                                courses.push({'id':id, 'course_id':course.id, 'data':course.course_code})
                                this.setState({highCourses: courses})
                            }else{
                                var courses = this.state.lowCourses;
                                courses.push({'id':id, 'course_id':course.id, 'data':course.course_code})
                                this.setState({lowCourses: courses})
                            }
                        }else{
                            newCourseList.push(course)
                        }

                    })
                    this.setState({courseList:newCourseList})
                })
                console.log(this.state.highCourses)
                console.log(this.state.lowCourses)
                this.setState({dataReceived: true})
            });
        })
    }

    saveCourses = () => {
        // const priority = res.data.priority
        // var newCourseList = []
        // this.state.courseList.map(course =>{
        //     if(course.id == res.data.courses){
        //         if(priority){
        //             var courses = this.state.highCourses;
        //             courses.push(course.course_code)
        //             this.setState({highCourses: courses})
        //         }else{
        //             var courses = this.state.lowCourses;
        //             courses.push(course.course_code)
        //             this.setState({lowCourses: courses})
        //         }
        //     }else{
        //         newCourseList.push(course)
        //     }
        // })
        // this.setState({courseList:newCourseList})
    }

    componentDidUpdate(prevProp, prevState){
        if(prevState.generatedContents !== this.state.generatedContents){
            this.handleScrollToGen();
            prevState.generatedContents = this.state.generatedContents;
        }
       
    }

    // handleKeyPress = (event) => {
    //     if(event.key === 'Enter'){
    //         const newCourse = event.target.value;
    //         this.setState(state =>{
    //             const highCourses = state.highCourses.concat(newCourse);
    //             return{highCourses};
    //         });
    //         console.log(this.state.highCourses)
    //     }
    // }
    handleCourseDelete = (addCourse) => {
        axios.delete('https://archerone-backend.herokuapp.com/api/courseprioritylist/'+addCourse.id+'/')
        .then(res => {
            console.log("deleted "+addCourse.id)
            const newCourseList = [];
            this.state.courseList.map(course => {
                newCourseList.push(course)
            })
            newCourseList.push({'id':addCourse.course_id, 'course_code':addCourse.data})
            this.setState({courseList:newCourseList})
        }).catch(error =>{
            console.log(error.response)
        })
    }

    handleAutoCompleteChange = (e, val) => {
        this.setState({currentCourse: val});
        this.setState({AutoCompleteValue: val});
    }

    handleAutoCompletePress = (e) => {
        const val = this.state.currentCourse;
        if(e.key === 'Enter'){
            this.handleAddCoursePriority();
        }
    }

    handleAddCoursePriority = () => {
        console.log(this.state.currentCourse)
        const val = this.state.currentCourse;
        this.setState({AutoCompleteValue: []})
        this.setState({currentCourse: []})
        this.setState({courseAdded: false})
        const newCourseList = [];

        if(val != undefined && val != []){
            // this.state.courseList.map(course => {
            //     if(course.id != val.id){
            //         newCourseList.push(course)
            //     }
            // })
            // this.setState({courseList:newCourseList})
            val.map(course => {
                if(course.course_code != undefined && course.course_code.trim() != ''){
                    const id = localStorage.getItem('user_id');
                    const data = {
                        courses: course.id,
                        priority: true,
                        user: id
                    }
                    axios.post('https://archerone-backend.herokuapp.com/api/coursepriority/', data,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => {
                        console.log(res)
                        const newCourse = {'id':res.data.id,'course_id':res.data.courses,'data':course.course_code}; 
                        this.setState(state =>{
                            const highCourses = state.highCourses.concat(newCourse);
                            return{highCourses};
                        });
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                }
            })
            this.setState({courseAdded: true})
        }       
    }

    handlePageChange = (e,index) => {
  
        this.setState(state =>{
            var currentContent = state.generatedContents[index];
            return {currentContent};
        });
        
        this.setState({currentPage: index});
        this.setState(state =>{
            var currentPage = index;
            return {currentPage};
            });

        // this.handleScrollToGen();

        if(this.state.savedScheds.includes(this.state.generatedContents[index].key)){
            this.setState({saveButtonLabel: "Saved"});
            const styleChange = {margin: "30px", backgroundColor: "white", color: "#16775D"};
            this.setState({saveButtonStyle: styleChange});
        }else{
            this.setState({saveButtonLabel: "Save Schedule"});
            const styleChange = {margin: "30px", backgroundColor: "#16775D", color: "white"};
            this.setState({saveButtonStyle: styleChange});
        }
    }

    createTimeslot = (day, hour, minute) =>{
        if(day == 'M'){
            return new Date(2018, 5, 25, hour, minute);
        }else if(day == 'T'){
            return new Date(2018, 5, 26, hour, minute);
        }else if(day == 'W'){
            return new Date(2018, 5, 27, hour, minute);
        }else if(day == 'H'){
            return new Date(2018, 5, 28, hour, minute);
        }else if(day == 'F'){
            return new Date(2018, 5, 29, hour, minute);
        }else if(day == 'S'){
            return new Date(2018, 5, 30, hour, minute);
        }
    }

    setSchedInfo = () => {
        console.log(this.state.schedules)
        var generatedContents = this.state.schedules.map((item, index) =>
            <GenSchedInfo key={item.id} id={item.id} offerings={item.offerings} scheduleContent={item.scheduleContent} tableContent={item.tableContent} prefContent={item.prefContent} conflictsContent={item.conflictsContent} titleName={item.title} earliest={item.earliest} latest={item.latest} updateSchedTitle={this.updateSchedTitle}/>
        );
        this.setState({currentPage: 0})
        this.setState({generatedContents});
        this.setState({hideGenContent: false});
        this.setState({pagesCount: generatedContents.length});
        this.setState({currentContent: generatedContents[0]})

        this.handleScrollToGen();
    }

    createData(classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled) {
        return { classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled };
    }

    createSchedInfo = () =>{
        if(!this.state.loading){
            this.setState({loading: true});
            this.setState({success: false});
          }else{
            this.setState({success: true});
            this.setState({loading: false});
          } 

        axios.post('https://archerone-backend.herokuapp.com/api/generateschedule/',
        {
            highCourses: this.state.highCourses, 
            lowCourses: this.state.lowCourses,
            user_id: localStorage.getItem('user_id')
        })
        .then(res => {
            console.log(res)
            const schedules = []
            var schedCount = 0;
            res.data.map(newSchedule =>{
                var count = 0;
                const scheduleContent = []
                const tableContent = []
                var earliest = 9
                var latest = 17


                newSchedule.offerings.map(offering=>{
                    var startTime = offering.timeslot_begin.split(':');
                    var endTime = offering.timeslot_end.split(':');
                    const newContent = 
                    {
                        id: count,
                        title: offering.course + ' ' + offering.section,
                        section: offering.section,
                        startDate: this.createTimeslot(offering.day,startTime[0],startTime[1]),
                        endDate: this.createTimeslot(offering.day,endTime[0],endTime[1]),
                        priorityId: 3,
                        location: offering.room,
                        professor: offering.faculty,
                        startTime: offering.timeslot_begin,
                        endTime: offering.timeslot_end,
                        days: offering.day,
                        classCode: offering.classnumber 
                    }
                    if(earliest > Number(startTime[0])){
                        earliest = Number(startTime[0])
                    }
                    if(latest < Number(endTime[0]) + 1){
                        latest = Number(endTime[0]) + 1
                    }
                    scheduleContent.push(newContent);
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

                    day = offering.day
                    classnumber = offering.classnumber
                    course = offering.course
                    section = offering.section
                    faculty = offering.faculty
                    timeslot_begin = offering.timeslot_begin
                    timeslot_end = offering.timeslot_end
                    room = offering.room
                    max_enrolled = offering.max_enrolled
                    current_enrolled = offering.current_enrolled
                    const newTableContent = this.createData(classnumber, course, section, faculty, day, timeslot_begin, timeslot_end, room, max_enrolled, current_enrolled);
                    // tableContent.push(newTableContent)
                    count += 1;
                })
                schedCount += 1;
                schedules.push({
                    id: schedCount,
                    title: "Schedule "+schedCount.toString(),
                    scheduleContent: scheduleContent,
                    tableContent: tableContent,
                    prefContent: [],
                    prefContent: newSchedule.preferences,
                    conflictsContent: newSchedule.information,
                    earliest: earliest,
                    latest: latest,
                    offerings: newSchedule.offerings
                });
            })
            console.log(schedules)
            this.setState({schedules});
            this.setSchedInfo();
            this.setState({success: true});
            this.setState({loading: false});
        }).catch(error => {
            console.log(error.response)
            this.setState({success: false});
            this.setState({loading: false});
        })
    }

    updateHighPriority(courseUpdate){
        var newArray = [];
        courseUpdate.map(course=>{
            newArray.push(course);
        })
        this.setState({highCourses: newArray})
    }

    updateLowPriority(courseUpdate){
        var newArray = [];
        courseUpdate.map(course=>{
            newArray.push(course);
        })
        this.setState({lowCourses: newArray})
    }
    
    updateSchedTitle=(text)=>{
         var newArray = [];
         const currentContent = this.state.currentContent;
        // var index = newArray.findIndex(this.state.currentContent);
        const newContent = <GenSchedInfo key={currentContent.props.id} earliest={currentContent.props.earliest} latest={currentContent.props.latest} id={currentContent.props.id} offerings={currentContent.props.offerings} scheduleContent={currentContent.props.scheduleContent} tableContent={currentContent.props.tableContent} prefContent={currentContent.props.prefContent} conflictsContent={currentContent.props.conflictsContent} titleName={text} updateSchedTitle={this.updateSchedTitle}/>

        this.state.generatedContents.map(value=>{
            if(value.key == this.state.currentContent.key){
                newArray.push(newContent)
            }else{
                newArray.push(value)
            }
        })

        this.setState({generatedContents: newArray});
        this.setState({currentContent: newContent});
    }
    
    handleScrollToGen=()=>{
        window.scrollTo({
            top: this.generatedRef.current.offsetTop,
            behavior: "smooth"
        })
    }

    handleSaveChange=()=>{
        this.setState({loading: true});
        if(this.state.savedScheds.includes(this.state.currentContent.key)){
            var newArray = [...this.state.savedScheds];
            const index = newArray.indexOf(this.state.currentContent.key);
            if (index > -1) {
            newArray.splice(index, 1);
            }
            
            this.setState({savedScheds: newArray});

            this.setState({saveButtonLabel: "Save Schedule"});
            const styleChange = {margin: "30px", backgroundColor: "#16775D", color: "white"};
            this.setState({saveButtonStyle: styleChange})
            this.setState({loading: false});
        }else{
            const courseOfferings = []
            const user_id = localStorage.getItem('user_id')
            console.log(this.state.currentContent)
            this.state.currentContent.props.offerings.map(offering => {
                courseOfferings.push(offering.id)
            })
            axios.post('https://archerone-backend.herokuapp.com/api/schedules/',{
                title: this.state.currentContent.props.titleName,
                courseOfferings: courseOfferings,
                user: user_id
            }).then(res => {
                // axios.get('https://archerone-backend.herokuapp.com/api/users/'+user_id+'/')
                // .then(res => {
                //     const schedules = res.data.schedules;
                //     schedules.push(sched_id);
                //     axios.patch('https://archerone-backend.herokuapp.com/api/users/'+user_id+'/',{
                //         schedules: schedules
                //     }).then(res => {
                //         console.log(res)
                        
                //     }).catch(err => {
                //         console.log(err.response)
                //     })
                // })
            }).catch(err => {
                console.log(err.response)

            })
            this.setState(state=>{
                const savedScheds = state.savedScheds.concat(state.currentContent.key);
                return {savedScheds};
            })
            this.setState({loading: false});
            this.setState({saveButtonLabel: "Saved"});
            const styleChange = {margin: "30px", backgroundColor: "white", color: "#16775D", borderStyle: "solid", borderColor: "#16775D"};
            this.setState({saveButtonStyle: styleChange});
            this.setState({snackBar: true});
        }
        

    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({snackBar: false});
      }

    render() { 
        let search_field = this.props.search_field;
        // const { currentPage } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {this.props.menu('generateSchedule')}
                {this.state.dataReceived ?
                <div>
                    <Column flexGrow={1} style={{margin: "40px"}}>
                        <div className="courseInputContainer">
                            <Row horizontal = 'center'>
                                <h1>SECOND TRIMESTER, AY 2019 - 2020</h1>
                            </Row>
                            <Row horizontal = 'center' style={{margin: "20px"}}>
                                <div id="search_container">
                                    {/* <Input
                                    type="search"
                                    name={search_field}
                                    id="exampleSearch"
                                    placeholder="Enter Course Name..."
                                    value = {this.state.Input}
                                    onKeyPress={this.handleKeyPress}
                                    /> */}
                                    <ComboBox
                                    page={"add"}
                                    onChange={this.handleAutoCompleteChange}
                                    onKeyPress={this.handleAutoCompletePress}
                                    value={this.state.AutoCompleteValue}
                                    />
                                     
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color = "Primary"
                                        disabled={!this.state.courseAdded}
                                        style={{backgroundColor: "green", color:"white", height:"56px"}}
                                        onClick={this.handleAddCoursePriority}>
                                        <AddIcon fontSize="medium"/>  
                                    </Button>

                                </div>
                            </Row>
                            <div className={"DnDContainer"}>
                                <Row vertical = 'center'>
                                    <Column flexGrow={1} horizontal = 'center'>
                                        <h3 className='priortyTitle'>Highest Priority</h3>
                                        <CourseDnD idTag={this.state.highPriorityId} courses={this.state.highCourses} updateFunction={this.updateHighPriority} handleCourseDelete={this.handleCourseDelete}/>

                                    </Column>
                                    <Column flexGrow={1} horizontal = 'center'>
                                        <h3 className='priortyTitle'>Lowest Priority</h3>
                                        <CourseDnD idTag={this.state.lowPriorityId} courses={this.state.lowCourses} updateFunction={this.updateLowPriority} handleCourseDelete={this.handleCourseDelete}/>
                                    </Column>
                                </Row>
                            </div>
                            <Row horizontal = 'center' style={{margin: "20px"}}>
                                <div className={classes.root}>
                                    <div className={classes.wrapper}> 
                                        <Button
                                        variant="contained"
                                        className={classes.schedButton}
                                        disabled={!this.state.courseAdded}
                                        onClick={()=>this.createSchedInfo()}
                                        
                                        // style={{backgroundColor: "green"}}
                                        >
                                        Generate Schedule
                                        </Button>
                                        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                                    </div>
                                </div>
                                {/* <button className="schedButton" onClick={()=>this.createSchedInfo()} style={{marginTop: "20px"}}>Generate Schedule</button> */}
                            </Row>
                        </div>

                        <div  ref={this.generatedRef}  className = "genSchedInfoContainer" style={this.state.hideGenContent ? {display: "none"} :  {margin: "40px"}}>
                            <span>{this.state.currentContent}</span>
                        
                            <div className = "paginationContainer">
                                <Pagination aria-label="Page navigation example" style={{justifyContent: "center"}}>
                                    <PaginationItem disabled={this.state.currentPage <= 0}>
                                        <PaginationLink onClick={e => this.handlePageChange(e, this.state.currentPage - 1)}
                                            previous/>
                                    </PaginationItem>
                                    {[...Array(this.state.pagesCount)].map((page, i) => 
                                        <PaginationItem active={i === this.state.currentPage} key={i} className={'paginationItemStyle'}>
                                            <PaginationLink onClick={e => this.handlePageChange(e, i)} className={'paginationLinkStyle'}>
                                            {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                        )}
                                    <PaginationItem disabled={this.state.currentPage >= this.state.generatedContents.length - 1}>
                                        <PaginationLink
                                            onClick={e => this.handlePageChange(e, this.state.currentPage + 1)}
                                            next
                                        />
                                        
                                        </PaginationItem>
                                </Pagination>
                            </div>
                            <Row horizontal='center'>
                                <div className={classes.root}>
                                        <div className={classes.wrapper}> 
                                            <Button
                                            variant="contained"
                                            className={classes.schedButton}
                                            disabled={this.state.loading}
                                            onClick={this.handleSaveChange}
                                            style={this.state.saveButtonStyle}
                                            >
                                            {this.state.saveButtonLabel}
                                            </Button>
                                            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgressSave}/>}
                                        </div>
                                        <Snackbar open={this.state.snackBar} autoHideDuration={4000} onClose={this.handleCloseSnackBar}>
                                            <Alert onClose={this.handleCloseSnackBar} severity="success">
                                            Your schedule have been successfully saved! View in <a href="/" style={{color:"#D3D3D3"}}>homepage</a>
                                            </Alert>
                                        </Snackbar>
                                    </div>
                                {/* <button className={"schedButton"} style={this.state.saveButtonStyle} onClick={this.handleSaveChange}>{this.state.saveButtonLabel}</button> */}
                            </Row>  
                        </div>
                    </Column>
                </div>
                : 
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
                    <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
                </div> }
            </div>  
        );
    }
}

GenerateSchedule.propTypes={
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(GenerateSchedule);