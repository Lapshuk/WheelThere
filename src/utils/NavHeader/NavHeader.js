import React, {Component} from 'react';
import AddMap from '../AddMap/AddMap'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  } from 'reactstrap';

import { Input } from 'reactstrap';
import { FaBeer, FaAccessibleIcon, FaGooglePlusSquare} from 'react-icons/fa';

import $ from 'jquery';

export default class NavHeader extends Component{
	constructor(){
		super();
		this.toggleMapModal = this.toggleMapModal.bind(this);
		this.state={
			modal: false
		}
	}
	toggleMapModal(e){
		e.preventDefault();
		this.setState({
			modal: true
		});
	}
	render(){
		return (
			<div>
				<Navbar className = "drop-shadow" color="light" light expand="md">
					<NavbarBrand href="/" className = "mr-auto">
						<img style={{width: '30px', height: '30px'}}src = "https://s3-us-west-2.amazonaws.com/badhorserecords/WheelthereIcon2.png"/>
						wheelthere
					</NavbarBrand>
				    <Nav navbar>
			          	  <NavItem>
		         			 <Input className="searchBar" type="search" name="searc" id="searchBar" placeholder="search" />
			              </NavItem>
			              <NavItem>
			                <NavLink href='/' onClick = {this.toggleMapModal} >Add map</NavLink>
			              </NavItem>
			              <NavItem >
			                <NavLink href='/'>Messages</NavLink>
			              </NavItem>
			              <NavItem >
			                <NavLink href='/'>Account</NavLink>
			              </NavItem>
			              <AddMap modal={this.state.modal} ref = "addMap"/>
			         </Nav>
	              </Navbar>
			</div>

		);
	}
}