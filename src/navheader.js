import React, {Component} from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
  } from 'reactstrap';

import { Input } from 'reactstrap';
import { FaBeer, FaAccessibleIcon, FaGooglePlusSquare} from 'react-icons/fa';

export default class NavHeader extends Component{
	render(){
		return (
			<div>
				<Navbar className = "drop-shadow" color="light" light expand="md">
					<NavbarBrand href="/" className = "mr-auto">
						<a href= "/"><img style={{width: '30px', height: '30px'}}src = "https://s3-us-west-2.amazonaws.com/badhorserecords/WheelthereIcon2.png"/></a>
						wheelthere
					</NavbarBrand>
				    <Nav navbar>

			          	  <NavItem>
		         			 <Input className="searchBar" type="search" name="searc" id="searchBar" placeholder="search" />
			              </NavItem>

			              <NavItem>
			              	<a href= "/"><img style={{width: '30px', height: '30px'}}src = "http://www.free-icons-download.net/images/plus-icon-27951.png"/></a>
			              </NavItem>
			              <NavItem>
			                <NavLink href="/components/">Messages</NavLink>
			              </NavItem>
			              <NavItem>
			                <NavLink href="/components/">Account</NavLink>
			              </NavItem>

			         </Nav>
	              </Navbar>
			</div>

		);
	}
}