import React, {Component} from 'react';
import {Row} from 'react-materialize';
import Top5 from '../components/Top5'
import Table from '../components/Table'
import background from '../images/main-solo.jpg';


class Main extends Component{
    componentDidMount(){}
    render(){
        return(
            <Row style={style.pickerPage}>
            <div className="col s3">
                <Row>
                    <Top5/>
                </Row>
            </div>
            <div className="col s5"></div>
            <div className="col s4">
                <h3 style={style.pickerText}>Pick Your Table</h3>
                <Table/>
            </div>

            </Row>
        )
    }
}

//Styles
const style = {
    pickerText: {
        color: 'white'
    },
    pickerPage: {
        backgroundImage: `url(${background})`,
        textShadow: '1px 1px grey',
        backgroundSize: 'cover',
        overflow: 'hidden',
        width: '90%',
        height: '600px'
    },
    spaceRow: {
        height:'260px'
    }
}

export default Main;