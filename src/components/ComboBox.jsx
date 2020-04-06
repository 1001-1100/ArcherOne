import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ComboBox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            college: '',
            programList: [],
            degrees: [],
            courseList: this.props.courseList
        }
    }

    componentWillReceiveProps(props){
        console.log('loading')
        const courseList = [];
        if(props.courseList != undefined){
            props.courseList.map(course =>{
                courseList.push(course)
            })
        }
        this.setState({courseList:courseList});
        this.changeProgramList(props);
    }

    changeProgramList(props) {

        var updatedProgramList = [];
        
        if(props.degrees != undefined){
            props.degrees.map(degree => {
                if(String(props.college) == String(degree.college)){
                    const program = {'id':degree.id, 'name':degree.degree_name};
                    updatedProgramList = updatedProgramList.concat(program);
                }
            })
        }

        this.state.programList = updatedProgramList;

    }

    render (){
        
        console.log(this.props.page);
      
        if(this.props.page == "register"){
            return (
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.programList}
                  getOptionLabel={option => option.name}
                  style={{ width: 500 }}
                  renderInput={params => <TextField {...params} label="Degree Program" variant="outlined" />}
                  value={this.props.value}
                  onChange={this.props.onChange}
                />
            );
        }
        else if(this.props.page == "search"){
            return (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={this.state.courseList}
                  getOptionLabel={option => option.course_code}
                //   style={{ width: 500 }}
                  filterSelectedOptions
                  renderInput={params => <TextField {...params} label="Search Courses" variant="outlined" />}
                  onChange={this.props.onChange}
                />
            );
        }
    }
}

export default ComboBox;