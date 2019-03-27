import React, {Component} from 'react';
import {Row, Input, Button, Icon, Modal} from 'react-materialize';
import API from '../utils/API';
import background from '../images/login-cards.jpg';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
          password: "",
          email: "",
          modalName: "",
          modalEmail: "",
          modalPassword: ""
        };
      }

    componentDidMount(){}

    dbTest = d => {
        API.getUsers().then((res) => {
            for(let x in res.data){
                console.log("Name: " + res.data[x].name)
            }
        })
    }

    createUser = e => {
        const userObj = {
            name: this.state.modalName,
            email: this.state.modalEmail,
            password: this.state.modalPassword
        }
        API.saveUser(userObj).then(res => {
            console.log(res)
            window.location.replace("/main")}
        ).catch(err => console.log(err))
    }

    handleSubmit = e => {
        e.preventDefault()
        const userObj = {
            email: this.state.email,
            password: this.state.password
        } 
        API.getUser(userObj.email, userObj).then((response, error) => {
            // document.getElementById("new").classList.remove("hide");
            if(error){
                console.log("error", error)
            }
            console.log("approved", response)
            // const data = {username:response.data[0].username, email:response.data[0].email, password:response.data[0].password}
            // sessionStorage.setItem('user', JSON.stringify(data))
            // this.setState({login:1, failed:false})
            window.location.replace("/main")
        }).catch(err => console.log(err))
    }

    render(){
        return(
            <div style={style.main} className="container">
            <h3>Login page</h3>
            <Row>
                <Input 
                    style = {style.inputText}
                    label="userEmail"
                    type="email"
                    onChange={event => this.setState({ email: event.target.value })}/>
                <Input 
                    style = {style.inputText}
                    label="Password"
                    type="text"
                    onChange={event => this.setState({ password: event.target.value })}/>
                <Button onClick={this.handleSubmit} className="light-green darken-3" style={style.btnText}>Login</Button>
            </Row>
            <Modal
                header='New User Form'
                trigger={<Button className="light-green darken-3" style={style.btnText}>Create New User
                <Icon right>insert_chart</Icon></Button>}>
                <Row>
                    <Input
                        label="Player's Name"
                        type="text"
                        onChange={event => this.setState({modalName: event.target.value})}/>
                    <Input
                        label="Email"
                        type="email"
                        onChange={event => this.setState({modalEmail: event.target.value})}/>
                    <Input
                        label="Password"
                        type="text"
                        onChange={event => this.setState({modalPassword: event.target.value})}/>
                    <Button 
                        className="light-green darken-3"
                        type="submit"
                        onClick={this.createUser}>Create</Button>
                </Row>
            </Modal>
            {/* <Button onClick={this.dbTest}>Test</Button> */}
            </div>
        );
    }
}

const style = {
    main: {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        overflow: 'hidden',
        width: '90%',
        height: '600px'
    },
    inputText:{
        color: 'whitesmoke'
    },
    btnText: {
        color: '#f9fbe7'
    }
}

export default Login;