import { db } from '../firebase-config.js'
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';


export function GetBooksByGenre(genre) {

    //let [books, setBooks] = useState([]);
    let booksRef = collection(db, 'Books');


    // useEffect(() => {
    const getBooks = async () => {
        let books = await getDocs(booksRef);
        //setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })));
        //let response = (data.docs.map( x=> ({...x.data(), id: x.id})));
        return books//.filter(x => x.genre == genre);
    };
    getBooks(genre);
    //}, [])
}