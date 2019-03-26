import React from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize'

export default function Nav(){
    return(
        <Navbar className="red darken-4" brand='Sabacc' right>
        <NavItem href='get-started.html'><Icon>person_pin</Icon></NavItem>
        <NavItem href='/chat'><Icon>chat</Icon></NavItem>
        <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
        <NavItem href='/'><Icon>undo</Icon></NavItem>
        </Navbar>
    )
} 