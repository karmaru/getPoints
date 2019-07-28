import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import { connect } from "react-redux";
import { updateUser } from '../src/redux/auth_reducer';
import routes from './routes'
import {Link} from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      initial: [],
      updated: [],
      search: '', 
      name: '',
      password: ''
}
this.register = this.register.bind(this)
this.login = this.login.bind(this)
}

componentDidMount() {
  axios.get(`https://swapi.co/api/people/`).then(res => {
    this.setState({
    initial: res.data.results
    });
    // console.log(this.state)
})}


handleInput = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
  // console.log(this.state)
};


async login() {
  let { name, password } = this.state;
  console.log('from login component', this.state, this.props)
  await axios
    .post("/auth/login", { name, password })
    .then(res => {
      this.props.updateUser(res.data);
    })
    .catch(err => {
      // console.log('2222222', err)
      alert("Please use a valid username and password!!!!!!!!!");
    });
  this.setState({
    name: '',  
    password: ''
  });
  console.log('after login', this.state, this.props)
}

register() {
  console.log('reg', this.state)
  const { name,password} = this.state;

  axios
    .post("/auth/register", { name, password})
    .then(res => {
      console.log('props after resister', this.props)
      this.props.updateUser(res.data)
    })
    .catch(err => {
      
      alert("User Already Exist Try Logging In")
    });
}

 



  render(){

    // const name1 = this.props.name 
  let getSearch = () => {
    axios.get(`https://swapi.co/api/people/?search=${this.state.search}`).then(res => {
    this.setState({
    updated: res.data.results
    });
    // console.log('after click', this.state, res.data.results)
    })}
  
  return (
    <div className="App">
      <h4>Welcome, {this.props.name}</h4>
     <div className='log'>
       <h4>Name</h4>
       <input type='text' name='name' onChange={this.handleInput}></input>
       <h4>Password</h4>
       <input type='text' name='password' onChange={this.handleInput}></input>
       <br/>
       <button onClick={this.login}>Login</button>
       <button onClick={this.register}>Resister</button>
       <hr/>
       </div> 


     {this.state.updated.map(person => {
       return (<h2>{person.name}</h2>)
     })
       
     }
     <input type="text" name='search' onChange={this.handleInput}></input>
     <button onClick={getSearch}>Search</button>
    {routes}
    <Link to="/Page2">Page2</Link>
    <Link to="/Page3">Page3</Link>
    </div>
  );
  }


}





function mapStateToProps(state) {
    const {userid} = state
      return {
        userid: userid,
        name: state.name
      };
    }
    const mapDispatchToProps = {      updateUser 
  }
    export default connect(
      mapStateToProps,mapDispatchToProps
    )(App);



    // const mapStateToProps = (state) => {
    //   return {
    //     name: state.name
    //   };
    // };

    
    
    // const mapDispatchToProps = dispatch => {
    //   return {
    //     updateUser: () => {
    //       dispatch(updateUser())
    //     }
    //   };
    // };
    
    // export default connect(mapStateToProps, mapDispatchToProps)(App);

