import React, {useEffect, useState} from 'react';
import {Row} from 'react-materialize';
import Card from '../components/Card';
import background from '../images/table-lando.jpg';
import io from 'socket.io-client';


export default function GameTable (){
        const [hand, setHand]= useState([]);

        // Make connection fo Sockets
        const socket = io('http://localhost:3002');

        useEffect(()=>{
            //card draw listener
            socket.on('next-card', function(data){
                console.log("One card" + data)
                setHand(data)
            })
            //shuffle listener
            socket.on('new-deck', function(data){})
            //Bet listener
            socket.on('bet-raised', function(data){})
            //Initial draw three cards listener
            socket.on('get-three', function(data){
                console.log("three cards: " + data)
                setHand(data)
            })
        }, [])

       
        //Socket calls for in game play
        function drawCard(info, currentHand){
            socket.emit('card-call', info, currentHand)
        }
        function takeThree(info, currentHand){
            socket.emit('take-three', info, currentHand)
        }
        function raiseBet(info){
            socket.emit('raise', info)
        }
        function callGame(){}

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
                    <li><a class="btn-floating red darken-4"><i class="material-icons" onClick={()=>takeThree("5c9ba7d32d1e0c1414e19ef2", hand)}>record_voice_over</i></a></li>
                    <li><a class="btn-floating light-green darken-1"><i class="material-icons">monetization_on</i></a></li>
                    <li><a class="btn-floating cyan darken-4" onClick={()=>drawCard("5c9ba7d32d1e0c1414e19ef2", hand)}><i class="material-icons">vertical_align_top</i></a></li>
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