import React, {Component, useState} from 'react';
import {Row} from 'react-materialize';
import Card from '../components/Card';
import background from '../images/table-lando.jpg';
import API from '../utils/API';

// class GameTable extends Component{
//     componentDidMount(){}
//     render(){
export default function GameTable (){
        const [hand, setHand]= useState([1,2,3]);
        const handArry =[1,2,3]

        function hookTest(nextCard){
            let cards = hand
            cards.push(nextCard)
            setHand(cards)
            console.log(hand)
        }

        function drawCard(){
            API.nextCard().then((res)=> {
                let cards = hand
                cards.push(res)
                setHand(cards)
            })
        }

        function raiseBet(){}

        function callGame(){}

        return (
            <div style={style.main} className="container">
                <Row style={style.bottom}>
                    {handArry.map(function(){return <Card/>})}
                </Row>
                <div class="fixed-action-btn">
                <a class="btn-floating btn-large lime darken-1">
                    <i class="large material-icons">content_copy</i>
                </a>
                <ul>
                    <li><a class="btn-floating red darken-4"><i class="material-icons">record_voice_over</i></a></li>
                    <li><a class="btn-floating light-green darken-1"><i class="material-icons">monetization_on</i></a></li>
                    <li><a class="btn-floating cyan darken-4" onClick={()=>hookTest(12)}><i class="material-icons">vertical_align_top</i></a></li>
                </ul>
            </div>
            </div>
        )
    }
// }

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
        left: '40%'
    }
}

// export default GameTable;