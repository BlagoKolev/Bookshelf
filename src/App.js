import './App.css';
import Header from './components/Header/Header.js'
import Footer from './components/Footer/Footer.js'
import Main from './components/Main/Main.js'

// import reportWebVitals from './reportWebVitals';
// import { db } from './firebase-config.js'
// import { collection, getDocs } from 'firebase/firestore';
// import { useEffect, useState } from 'react';


function App() {

  // let [books, setBooks] = useState([]);
  // let booksRef = collection(db, 'Books');


  // useEffect(() => {
  //   const getBooks = async () => {
  //     let data = await getDocs(booksRef);
  //     console.log(data.docs[0])
  //     setBooks(data.docs.map( x=> ({...x.data(), id: x.id})));
  //     //let response = (data.docs.map( x=> ({...x.data(), id: x.id})));
  //    // console.log(response)
  //   };
  //   getBooks();
  // }, [])

  return (
    <div className="App">
      {/* {books.map((book) => book.genre == 'Fantasy' ? <h2>{book.title}</h2> : <h2></h2>)} */}
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
