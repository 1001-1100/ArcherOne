import React, { Component } from "react";
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            rows: [],
            enlists: [],
            addIdnum: '',
            dataReceived: false
        }
    }

    createData(course, section, classnumber, idnum, name, enrolled, capacity) {
        return { course, section, classnumber, idnum, name, enrolled, capacity};
    }

    createEnlistData(id, idnum, allowed){
        return { id, idnum, allowed};
    }

    componentDidMount(){
        this.setState({dataReceived: false})
        const rows = []
        const enlists = []
        axios.get('https://api.animosched.live/api/carts/').then(res => {
            res.data.map(cart => {
                axios.get('https://api.animosched.live/api/getclass/'+cart.classnumber).then(res => {
                    var data = res.data[0][0]
                    if(data != undefined){
                        rows.push(this.createData(data.course, data.section, data.classnumber, cart.idnum, cart.name, data.current_enrolled, data.max_enrolled))
                        this.setState({rows})
                    }
                })
            })
        })
        axios.get('https://api.animosched.live/api/enlists/').then(res => {
            console.log(res.data)
            res.data.map(enlist => {
                enlists.push(this.createEnlistData(enlist.id, enlist.idnum, enlist.allowed))
                this.setState({enlists})
            })
        })
        this.setState({dataReceived: true})
    }

    handleSimul = () => {
        axios.get('https://api.animosched.live/api/enlist/').then(res => {
            window.location.reload()
        })
    }

    handleEmptyAll = () => {
        axios.get('https://api.animosched.live/api/empty/').then(res => {
            window.location.reload()
        })
    }

    handleFull = (classnumber) => {
        axios.post('https://api.animosched.live/api/modifyoffering/', {
            classnumber,
            action: 'full'
        }).then(res => {
            window.location.reload()
        })
    }

    handleEmpty = (classnumber) => {
        axios.post('https://api.animosched.live/api/modifyoffering/', {
            classnumber,
            action: 'empty'
        }).then(res => {
            window.location.reload()
        })
    }

    handleAllow = (id) => {
        axios.post('https://api.animosched.live/api/enlists/', {
            idnum: id,
            allowed: true
        }).then(res => {
            window.location.reload()
        })
    }

    handleChange = (e) => {
        this.setState({addIdnum: e.target.value})
    }

    handleAddEnlist = () => {
        axios.post('https://api.animosched.live/api/enlists/', {
            idnum: this.state.addIdnum,
            allowed: true
        }).then(res => {
            window.location.reload()
        })
    }
    handleDeleteEnlist = (id) => {
        axios.delete('https://api.animosched.live/api/enlists/'+id).then(res => {
            window.location.reload()
        })
    }
    render() {
      return (
        <div>
            {this.state.dataReceived ?
            <div>
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell align="right">Classnumber</TableCell>
                    <TableCell align="right">ID Number</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Enrolled</TableCell>
                    <TableCell align="right">Capacity</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.rows.map((row) => (
                    <TableRow key={row.course}>
                    <TableCell><Button variant="contained" onClick={() => this.handleFull(row.classnumber)}>Full</Button>
                    <Button variant="contained" onClick={() => this.handleEmpty(row.classnumber)}>Empty</Button>
                    <Button variant="contained" onClick={() => this.handleAllow(row.idnum)}>Allow</Button></TableCell>
                    <TableCell component="th" scope="row">
                        {row.course + ' ' + row.section}
                    </TableCell>
                    <TableCell align="right">{row.classnumber}</TableCell>
                    <TableCell align="right">{row.idnum}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.enrolled}</TableCell>
                    <TableCell align="right">{row.capacity}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Divider>

            </Divider>

            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell>ID Number</TableCell>
                    <TableCell>Allowed</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.enlists.map((row) => (
                    <TableRow key={row.idnum}>
                    <TableCell>
                        <Button variant="contained" onClick={() => this.handleDeleteEnlist(row.id)}>Delete</Button>

                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.idnum}
                    </TableCell>
                    <TableCell>{row.allowed ? 'true' : 'false'}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <span>
                <Button variant="contained" onClick={this.handleSimul}>Simulate Enlistment</Button>
                <Button variant="contained" onClick={this.handleEmptyAll}>Empty course offerings</Button>
            </span>
            <span>
                <TextField onChange={this.handleChange}></TextField>
                <Button variant="contained" onClick={this.handleAddEnlist}>Add allowed</Button>
            </span>
            </div>
            :
            null}

        </div>        
      );
    }
  }

  Admin.propTypes={
    classes: PropTypes.object.isRequired,
  };
export default (Admin);