import style from './Main.module.css';
import { Route } from 'react-router-dom';
import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import BookDetails from '../BookDetails/BookDetails.js'
import BookCard from '../BookCard/BookCard';

function Main() {
    return (
        <div className={style.main}>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/bookDetails/:id" component={BookDetails} />
        </div>
    )
}

export default Main;