import React, {useEffect, useState} from 'react';
import {Row} from 'react-materialize';
import Card from '../components/Card';
import background from '../images/table-lando.jpg';
import io from 'socket.io-client';

export default function GameTable (props){
        const [hand, setHand] = useState([]);
        const [hasDrawnCard, setHasDrawnCard] = useState(true);
        const [tableInfo, setTableInfo] = useState({
            round: [0,0],
            player: 6
        })
        const [tableStore, setTableStore] = useState({
            loggedInPlayer: '',
            tableNumber: ''
        });
        const [deltIn, setDeltIn] = useState(2)
        const [myTurn, setMyTurn] = useState(false)

        // Make connection fo Sockets
        var ip = window.location.hostname;
        const socket = io(window.location.hostname + ':3002');
        
        //Loads table store with player and table data from local storage
        useEffect(()=>{
            console.log("ip: "+ip)
             const rawStore = JSON.parse(localStorage.getItem('data'));
             setTableStore({
                 loggedInPlayer: rawStore.loggedInPlayer,
                 tableNumber: rawStore.tableNumber
             })
             if(deltIn === 2){
                socket.emit('table-info', rawStore.tableNumber, rawStore.loggedInPlayer)
                setDeltIn(true)
             }
        }, [])

        useEffect(()=>{
            //loads info from localStorage
            const rawStore = JSON.parse(localStorage.getItem('data'));
            console.log("Props: " + JSON.stringify(props))
            //card draw listener
            socket.on(`${rawStore.loggedInPlayer}next-card`, function(data){
                console.log("One card" + data)
                setHand(data)
            })
            //shuffle listener
            socket.on('new-deck', function(data){})
            //Bet listener
            socket.on(`${rawStore.loggedInPlayer}bet-raised`, function(data){})
            //Initial draw three cards listener
            socket.on(`${rawStore.loggedInPlayer}get-three`, function(data){
                setHand(data)
            //Listener to load round information
            socket.on(`round-info`, function(data){
                console.log("Round-Info: ", data)
                setTableInfo(data)
            })
            })
            // Listener for table info
            socket.on(`${rawStore.loggedInPlayer}table-info-back`, function(data){
                console.log("Table-Info: ", data)
                setTableInfo(data)
            })
            //Folded hand listener
            socket.on(`${rawStore.loggedInPlayer}hand-folded`, function(){
                setDeltIn(false)
            })
            //Turn listener
            socket.on(`${rawStore.loggedInPlayer}my-turn`, function(){
                setMyTurn(true)
            })
        }, [])

       
        //Socket calls for in game play
        function drawCard(info, currentHand, sendingPayer){
            setHasDrawnCard(true)
            socket.emit('card-call', info, currentHand, sendingPayer)

        }
        function takeThree(info, currentHand, sendingPayer){
            setHasDrawnCard(false)
            socket.emit('take-three', info, currentHand, sendingPayer)
            setTimeout(() => {
                callGame(tableStore.tableNumber, tableInfo, hand)
            }, 1000);
        }
        function raiseBet(info, sendingPayer){
            socket.emit('raise', info, sendingPayer)
        }
        function callGame(tableId, info, currentHand){
            setHasDrawnCard(false)
            socket.emit('round-call', tableId, info, currentHand)
            setMyTurn(false)
        }
        function fold(){
            socket.emit('fold-hand', tableStore.tableNumber, tableStore.loggedInPlayer)
        }

        return (
            <div style={style.main} className="container">
                <Row style={style.bottom}>
                    {hand.map(function(num){return <Card card={num}/>})}
                </Row>
                <div class="fixed-action-btn">
                <a class="btn-floating btn-large lime darken-1">
                    <i class="large material-icons">content_copy</i>
                </a>
                <ul>
                    <li><a class="btn-floating red darken-4"><i class="material-icons" onClick={()=>tableInfo.round[0] === 0 ? takeThree(tableStore.tableNumber, hand, tableStore.loggedInPlayer) : callGame(tableStore.tableNumber, tableInfo, hand)}>record_voice_over</i></a></li>
                    <li><a class="btn-floating cyan darken-4" onClick={()=> !hasDrawnCard ? drawCard(tableStore.tableNumber, hand, tableStore.loggedInPlayer) : console.log("Card has already been drawn")}><i class="material-icons">vertical_align_top</i></a></li>
                    <li><a class="btn-floating light-green darken-1"><i class="material-icons">monetization_on</i></a></li>
                    <li><a class="btn-floating orange lighten-1" onClick={fold}><i class="material-icons">get_app</i></a></li>
                </ul>
            </div>
            </div>
        )
    }

const style = {
    main:{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        overflow: 'hidden',
        height: '600px',
        width: '90%',

    },
    spaceRow: {
        height:'400',
        width: '100%'
    },
    bottom: {
        position: 'absolute',
        bottom: '0',
        marginBottom: '0',
        left: '25%'
    }
}