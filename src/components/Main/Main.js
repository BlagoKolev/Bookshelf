import { Route } from 'react-router-dom';
import Home from '../Home/Home.js';
import Login from '../Login/Login.js';
import style from './Main.module.css';

function Main() {
    return (
        <div className={style.main}>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />

        </div>
    )
}

export default Main;