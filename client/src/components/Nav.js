import React, {useState, useEffect} from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize';
import API from '../utils/API';
import io from 'socket.io-client';

export default function Nav(){
    const socket = io(window.location.hostname + ':3002');
    const [store, setStore] = useState({
        table: '',
        player:''
    });

    useEffect(()=>{
        if(window.location.href === ('http://' + window.location.hostname + ':3000/play')){
            const rawStore = JSON.parse(localStorage.getItem('data'));
            setStore({
                table: rawStore.tableNumber,
                player: rawStore.loggedInPlayer
            })
        }
    }, [])

    function gameCheck(){
        // console.log(window.location.href)
        if(window.location.href === ('http://' + window.location.hostname + ':3000/play')){
            console.log("removing player: " + store.player)
            socket.emit('remove-player-@table', store.table, store.player)
            window.location.replace("/main")
        }else if(window.location.href === ('http://' + window.location.hostname + ':3000/main')){
            console.log('Logging Player out')
            window.location.replace("/")
        }
    }
    return(
        <Navbar className="red darken-4" brand='Sabacc' right>
        <NavItem href='/instructions'><Icon>chrome_reader_mode</Icon></NavItem>
        <NavItem href='/chat'><Icon>chat</Icon></NavItem>
        <NavItem href='/main' onClick={(playerID)=>{API.newTable(playerID); window.location.replace("/main")}}><Icon>add_circle</Icon></NavItem>
        <NavItem href='/'onClick={gameCheck}><Icon>undo</Icon></NavItem>
        </Navbar>
    )
} 