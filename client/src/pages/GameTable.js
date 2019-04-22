import React, {useEffect, useState} from 'react';
import {Row} from 'react-materialize';
import Card from '../components/Card';
import background from '../images/table-lando.jpg';
import io from 'socket.io-client';

export default function GameTable (props){
        const [hand, setHand] = useState([]);
        const [round, setRound] = useState([])
        const [tableStore, setTableStore] = useState({
            loggedInPlayer: '',
            tableNumber: ''
        });

        // Make connection fo Sockets
        const socket = io('http://localhost:3002');

        //Loads table store with player and table data from local storage
        useEffect(()=>{
             const rawStore = JSON.parse(localStorage.getItem('data'));
             setTableStore({
                 loggedInPlayer: rawStore.loggedInPlayer,
                 tableNumber: rawStore.tableNumber
             })
        }, [])

        useEffect(()=>{
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
            console.log(tableStore.loggedInPlayer)
            socket.on(/*tableStore.loggedInPlayer*/ `${rawStore.loggedInPlayer}get-three`, function(data){
                console.log("three cards: " + data)
                setHand(data)
            //Listener to load round information
            socket.on('round-info', function(data){
                console.log("Round-Info: ", data)
                // setRound(data) 
            })
            })
        }, [])

       
        //Socket calls for in game play
        function drawCard(info, currentHand, sendingPayer){
            socket.emit('card-call', info, currentHand, sendingPayer)
        }
        function takeThree(info, currentHand, sendingPayer){
            socket.emit('take-three', info, currentHand, sendingPayer)
        }
        function raiseBet(info, sendingPayer){
            socket.emit('raise', info, sendingPayer)
        }
        function callGame(info, currentHand){
            socket.emit('round-call', info, currentHand)
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
                    <li><a class="btn-floating red darken-4"><i class="material-icons" onClick={()=>takeThree(tableStore.tableNumber, hand, tableStore.loggedInPlayer)}>record_voice_over</i></a></li>
                    <li><a class="btn-floating light-green darken-1"><i class="material-icons">monetization_on</i></a></li>
                    <li><a class="btn-floating cyan darken-4" onClick={()=>round[1] === 0 ? drawCard(tableStore.tableNumber, hand) : callGame(tableStore.tableNumber, hand)}><i class="material-icons">vertical_align_top</i></a></li>
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