import style from './Main.module.css';
import { Route } from 'react-router-dom';
import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import BookDetails from '../BookDetails/BookDetails.js'
import BookCard from '../BookCard/BookCard';
import Genre from '../Genres/Genre';

function Main() {
    return (
        <div className={style.main}>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/bookDetails/:id" component={BookDetails} />
            <Route path="/actionAndAdventure" render={(props) => (<Genre passedGenre='Action and Adventure' {...props} authed={true} />)} />
            <Route path="/classics" render={(props) => (<Genre passedGenre="Classics" {...props} authed={true} />
            )} />
            <Route path="/comics" render={(props) => (<Genre passedGenre="Comic Book or Graphic Novel" {...props} authed={true} />)} />
            <Route path="/mystery" render={(props) => (<Genre passedGenre="Detective and Mystery" {...props} authed={true} />)} />
            <Route path="/fantasy" render={(props) => (<Genre passedGenre="Fantasy" {...props} authed={true} />)} />
            <Route path="/science" render={(props) => (<Genre passedGenre="Science" {...props} authed={true} />)} />
            <Route path="/horror" render={(props) => (<Genre passedGenre="Horror" {...props} authed={true} />)} />
            <Route path="/literaryFiction" render={(props) => (<Genre passedGenre="Literary Fiction" {...props} authed={true} />)} />

        </div>
    )
}

export default Main;