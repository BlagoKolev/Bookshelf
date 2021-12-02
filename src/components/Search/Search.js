import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config.js';
import BookCard from "../BookCard/BookCard";
import style from './Search.module.css';

function Search(props) {

    const [books, setBooks] = useState([]);
    const [word, setWord] = useState(props.location.state.searchWord);

    let newWord = props.location.state.searchWord;
    console.log(newWord)
    console.log(word)

    if (word != newWord) {
        const searchBookByTitle = async (e) => {

            const booksRef = collection(db, "Books");
            const data = await getDocs(booksRef);
    
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })).filter(x => x.title.toLowerCase().includes(searchWord)));
        
        }
        searchBookByTitle();
    }

    // const [searchTerms, setSearchTerms] = useState("");

    // const booksRef = collection(db, 'Books');
    console.log('In Search.js:' + props.location.state.searchWord)
    //console.log(location.state.search)
    let searchWord = props.location.state.searchWord;

    // useEffect( (e) => {
    //     const searchBookByTitle = async (e) => {

    //         const booksRef = collection(db, "Books");
    //         const data = await getDocs(booksRef);
    
    //         setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })).filter(x => x.title.toLowerCase().includes(searchWord)));
        
    //     }
    //     searchBookByTitle();
    // },[])

    return (
        <div className={style.searchWrapper}>
            {books.map(x => <BookCard key={x.id} details={x} />)}
        </div>
    );

}

export default Search;