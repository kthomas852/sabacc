import React, {useState} from 'react';
import {M} from 'react-materialize';

export default function Card () {

    // document.addEventListener('DOMContentLoaded', function() {
    //     var elems = document.querySelectorAll('.fixed-action-btn');
    //     var instances = M.FloatingActionButton.init(elems, {
    //       direction: 'left'
    //     });
    //   });

    return (
        <span style={style.playingCard}>
            <h2 style={style.cardText}>12</h2>
        </span>
    )
}

const style = {
    playingCard: {
        width: '120px',
        height: '200px',
        backgroundColor: 'white',
        float: 'right',
        marginLeft: '5px',
        marginRight: '5px'
    },
    text: {
        color: "white"
    },
    cardText: {
        textAlign: 'center'
    }
}