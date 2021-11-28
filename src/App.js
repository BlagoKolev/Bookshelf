import './App.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Main from './components/Main/Main.js';
import { auth } from './firebase-config.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
//import { onAuthStateChanged } from 'firebase/auth;'
// import reportWebVitals from './reportWebVitals';
// import { db } from './firebase-config.js'
// import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import userEvent from '@testing-library/user-event';


function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(setUser)
  }, []);
  
  return (
    <div className="App">
      <Header username={user?.email} isAuthenticated={Boolean(user)} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
