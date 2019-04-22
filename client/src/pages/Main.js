import React, {useEffect, useState} from 'react';
import {Row} from 'react-materialize';
import Top5 from '../components/Top5'
import Table from '../components/Table'
import background from '../images/main-solo.jpg';
import API from '../utils/API';
// import TableWrapper from '../components/tableWrapper';
// import Loader from '../HOC/LoaderHOC';


/*export default*/ function Main (){
    const [floor, setFloor] = useState([])
    // const WrappedTables = TableWrapper(Table, floor, ()=> API.wrapper())

    useEffect(()=>{
        API.getTables().then((tables)=>{
            let tIDs = []
            for(let i=0; i<tables.data.length; i++){
                let obj ={
                    id: tables.data[i]._id,
                    players: tables.data[i].players.length
                }
                tIDs.push(obj)
            }
            setFloor(tIDs)
        })
    }, [])

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
            {/* <WrappedTables/> */}
            {floor.map(function(T){
                return <Table id={T.id} players={T.players}/>
            })}
        </div>

        </Row>
    )
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

export default Main