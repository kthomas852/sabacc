import React, {useState} from 'react';
import './card.css';

export default function Card (props) {
    const [clicked, setClicked] = useState(false);
    function selected(){
        clicked ? setClicked(false) : setClicked(true)
        console.log("Is Clicked: "+ clicked.toString())
    }
    return (
        <span class={props.card > 0 ? 'playingCardPositive' : 'playingCardNegative'} onClick={selected} style={clicked ? style.selected : style.unselected}>
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
    },
    selected: {
        backgroundColor: 'rgb(178, 241, 178)'
    },
    unselected: {

    }
}