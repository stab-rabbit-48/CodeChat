import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './containers/Login';
import Chatroom from './containers/Chatroom';
import MessageBoard from './containers/MessageBoard';


const App = () => {
  
  return ( <Login />)
}


// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currentUser: 'Michael',
//       currentChatroom: '',
//       token: '',
//       loggedIn: false,
//       // chatrooms: [{title:'Michael', status:'Closed', password:''}, {title:'Kai', status:'Closed', password:''}, {title:'Catilin', status:'Open', password:''}],
//       favorites: ['David', 'Yuanji', 'Evan', 'Charlie'],
//     };

//     // const [token, setToken] = useState();
//     this.logIn = this.logIn.bind(this);
//     this.signOut = this.signOut.bind(this);
//     this.refresh = this.refresh.bind(this);
//   }

//   componentDidMount(){
//     fetch('/home')
//       .then(res => res.json())
//       .then(data => {
//         // console.log(data);
//         return this.setState({
//           ...this.state,
//           chatrooms: data
//         });
//       })
//       .catch(err => console.log('App.componentDidMount: getChatrooms: ERROR: ', err));
//   }

//   logIn() {
//     this.setState({
//       ...this.state,
//       loggedIn: true
//     })
//   }

//   signOut() {
//     this.setState({
//       ...this.state,
//       loggedIn: false
//     })
//   }

//   refresh() {
//     fetch('/home', {mode: 'cors'})
//       .then(res => res.json())
//       .then(data => {
//         // console.log(data);
//         return this.setState({
//           ...this.state,
//           chatrooms: data
//         });
//       })
//       .catch(err => console.log('App.js METHOD refresh ERROR: ', err));
//   }

//   render() {
//     if(!this.state.loggedIn) {
//       return (<Login handleClick={this.logIn}/>)
//     }

//     return (
//       <div id='container'>
//         <Router>
//           <Routes>
//             <Route exact path='/' element={<MessageBoard refresh={this.refresh} signout={this.signOut} name={this.state.currentUser} chatrooms={this.state.chatrooms} favorites={this.state.favorites}/>} />
//             <Route path='/chatroom' element={<Chatroom />} />
//           </Routes>
//         </Router>
//       </div>
//     );
//   }
// }

export default App;
