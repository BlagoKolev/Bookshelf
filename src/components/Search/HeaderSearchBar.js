import style from './HeaderSearchBar.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config.js';

function HeaderSearchBar() {

    const [searchWord, setSearchWord] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async (e) => {
            let booksRef = collection(db, "Books");
            let data = await getDocs(booksRef);
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })));
        }
        getBooks();
    }, [])
   
    const onClickClearContent = (e) => {
        setSearchWord("");
    }


    return (
        <div className={style.searchBar}>
            <div className={style.searchFieldContainer}>
                <input type="text"
                    className={style.searchField}
                    value={searchWord}
                    onChange={(e) => { setSearchWord(e.target.value); }}
                    placeholder="...search by book title" />
                {searchWord.length > 0
                    ? <div className={style.closeIcon}>
                        <i class="fas fa-times-circle" onClick={onClickClearContent}></i>
                    </div>
                    : <Link to={{ pathname: "/search", state: { searchWord } }}
                        className={style.searchLink}
                        onChange={(e) => setSearchWord(e.target.value)}>
                        <i className="fas fa-search"></i>
                    </Link>
                }
            </div>
            {searchWord.length > 0 && (
                <div className={style.dataResult}>
                    {books.filter(x => x.title.toLowerCase().includes(searchWord.toLowerCase())).map((x) => {
                        return (
                            <Link to={`/bookDetails/${x.id}`} details={x}
                                className={style.headerSearchLink}
                                onClick={(e) => { setSearchWord("") }}>
                                <p className={style.dataItem}>{x.title}</p>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default HeaderSearchBar;