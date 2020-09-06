import React from 'react';
import { Nav, NavItem, Navbar, Badge, NavDropdown } from 'react-bootstrap';
import '../css/Menu.css';
import NotifCenter from './Notifications.jsx'
import Friends from './Friends.jsx'

import Avatar from 'react-avatar';
import { Divider } from '@material-ui/core';

import {
    Collapse,
    NavbarToggler,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentPage: props.currentPage,
            notifRefresh: false
        }
    }

    // handleChange=(page)=>{
    //     var activePage = [...this.state.activePage];
    //     activePage.map(page=>{
    //         page = false;
    //     })

    //     activePage[page] = true;
    //     this.setState({activePage});
    //     console.log(activePage);
    // }

    handleRefreshFriends = () => {

    }

    render (){
        const loggedIn = () => {
            return(
                <React.Fragment>
                    <Nav /*activeKey={"/preferences"}*/>
                    <Nav.Link active={this.state.currentPage == 'flowchart'} href="/flowchart">View Flowchart</Nav.Link>
                    <Nav.Link active={this.state.currentPage == 'search_courses'} href="/search_courses" >Search Courses</Nav.Link>
                    <Nav.Link active={this.state.currentPage == 'preferences'} href="/preferences">Preferences</Nav.Link>
                    <Nav.Link active={this.state.currentPage == 'generateSchedule'} href="/generateSchedule">Generate Schedule</Nav.Link>
                    <Nav.Link active={this.state.currentPage == 'savedSchedules'} href="/">Saved Schedules</Nav.Link>
                    <Divider orientation="vertical" light={true} flexItem />
                    <Nav.Link active={this.state.currentPage == 'profile'} href="/profile">
                        {/* <svg class="bi bi-circle-fill" id='profileLink' width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="8"></circle>
                        </svg> */}
                        <Avatar name={this.props.first_name +" "+ this.props.last_name} textSizeRatio={2.30} round={true} size="25" style={{marginRight: "14px",}} />
                       {this.props.first_name} 
                    </Nav.Link>
                    <Divider orientation="vertical" light={true} flexItem />
                    <Nav.Link>
                        <Friends notifRefresh={this.state.notifRefresh} />
                    </Nav.Link>
                    <Nav.Link>
                        <NotifCenter notifRefresh={this.state.notifRefresh} />
                    </Nav.Link>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                        </DropdownToggle>
                            <DropdownMenu right style={{marginTop: "6px"}}>
                                <DropdownItem onClick={this.props.handle_logout} >
                                Logout
                                </DropdownItem>
                            </DropdownMenu>
                    </UncontrolledDropdown>
                    {/* <Nav.Link eventKey={2} href="#memes"> Dank memes </Nav.Link> */}
                    </Nav>
                </React.Fragment>
            );
        }
    
        const loggedOut = () => {
            return(
                <React.Fragment>
                    <Nav.Link href="/login">Sign In</Nav.Link>
                </React.Fragment>
            );
        }

        return(
            <Navbar id="navbarStep" sticky="top" collapseOnSelect expand="lg" className="color-nav" variant="dark">
            <Navbar.Brand href="/">
            <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            AnimoSched
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">                    
                    <Nav className="ml-auto">
                        {this.props.logged_in ? loggedIn() : loggedOut()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Menu 