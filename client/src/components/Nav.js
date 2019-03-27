import React from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize'
import API from '../utils/API'

export default function Nav(){
    return(
        <Navbar className="red darken-4" brand='Sabacc' right>
        <NavItem href='/instructions'><Icon>chrome_reader_mode</Icon></NavItem>
        <NavItem href='/chat'><Icon>chat</Icon></NavItem>
        <NavItem href='/main' onClick={(playerID)=>{API.newTable(playerID); window.location.replace("/main")}}><Icon>add_circle</Icon></NavItem>
        <NavItem href='/'><Icon>undo</Icon></NavItem>
        </Navbar>
    )
} 