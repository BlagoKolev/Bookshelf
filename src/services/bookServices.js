import { db } from '../firebase-config.js'
import { collection, getDocs } from 'firebase/firestore';

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

export function GetBookById(id) {
    console.log('service')
    let booksRef = collection(db, 'Books');
          let getBook = async () => {
            let data = await getDocs(booksRef);
           return (data.docs.map(x => ({ ...x.data(), id: x.id })).filter(x=> x.id == id));
           console.log(data);
           return data;
        };   
        getBook();
}

// export function GetBookById(id) {
//     fetch('https://bookshelf-3c638.firebaseapp.com/Books/json')
//     .then(resp => resp.json())
//     .then(resp => console.log(resp))
// }