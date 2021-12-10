import style from './Main.module.css';
import { Route } from 'react-router-dom';
import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import BookDetails from '../BookDetails/BookDetails.js';
import Genre from '../Genres/Genre';
import Search from '../Search/Search';
import Upload from '../Upload/Upload.js';
import MyBooks from '../MyBooks/MyBooks.js';
import EditBook from '../BookDetails/EditBook.js';
import { UserContext } from '../../Helper/Context.js';
import { useContext } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

function Main() {
   
    //const {user, setUser} = useContext(UserContext);
    const context = useContext(UserContext);
    let user = context.user;
    //console.log(user?.uid)

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
            {/* <Route  path="/search" component={Search}/> */}
            <Route path="/search" render={(props) => (<Search {...props} auther={true} />)} />
            {/* <Route path="/uploadFile" render={(props) => (<Upload currentUser={user} {...props} auther={true} />)} /> */}
            {/* <Route path="/uploadFile" component={Upload }  /> */}
            <ProtectedRoute path="/uploadFile" component={Upload} isAuthenticated={Boolean(user)} />
            <ProtectedRoute path="/myBooks" component={MyBooks} isAuthenticated={Boolean(user)} />
            {/* <Route path="/myBooks" render={(props) => (<MyBooks currentUser={user} {...props} auther={true} />)} /> */}
            {/* <Route path="/myBooks" component={MyBooks} /> */}
            <Route path="/editBook/:bookId" component={EditBook} />
        </div>
    )
}

export default Main;