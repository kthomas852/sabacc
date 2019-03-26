import React, {useState} from 'react';
import './card.css';

export default function Card (props) {
    let clicked = false;
    function stylePicker(){
        clicked ? clicked = false : clicked = true
        if(props.card > 0){
            if(clicked){
                document.getElementById('card').className ='playingCardPositive selected'
            }
            document.getElementById('card').className = 'playingCardPositive'
        }
        if(clicked){
            document.getElementById('card').className ='playingCardNegative selected'
        }
        document.getElementById('card').className = 'playingCardNegative'
    }
    return (
        <span class={props.card > 0 ? 'playingCardPositive' : 'playingCardNegative'}>
            <i class="material-icons">{props.card > 0 ? 'vertical_align_top' : 'vertical_align_bottom'}</i>
            <h2 style={style.cardText}>{props.card}</h2>
            <i class="material-icons" style={{'float': 'right'}}>{props.card > 0 ? 'vertical_align_top' : 'vertical_align_bottom'}</i>
        </span>
    )
}

const style = {
    playingCardPositive: {
        width: '120px',
        height: '200px',
        padding: '8px',
        backgroundColor: 'white',
        float: 'right',
        marginLeft: '5px',
        marginRight: '5px',
        borderRadius: '10%',
        border: 'solid 8px green'
    },
    playingCardNegative: {
        width: '120px',
        height: '200px',
        padding: '10px',
        backgroundColor: 'white',
        float: 'right',
        marginLeft: '5px',
        marginRight: '5px',
        borderRadius: '10%',
        border: 'solid 8px red'
    },
    text: {
        color: "white"
    },
    cardText: {
        textAlign: 'center'
    }
}