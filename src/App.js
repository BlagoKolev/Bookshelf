import './App.css';
import Header from './components/Header/Header.js'
import Footer from './components/Footer/Footer.js'
import Main from './components/Main/Main.js'

import { db } from './firebase-config.js'
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import reportWebVitals from './reportWebVitals';
import { Route } from 'react-router';

function App() {

  // let usersRef = collection(db, 'users');

  // useEffect(() => {
  //   const getUsers = async () => {
  //     let data = await getDocs(usersRef);
  //     let response = data.docs.map( x=> ({...x.data(),id: x.id}));
  //     console.log(response)
  //   };
  //   getUsers();
  // }, [])

  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
