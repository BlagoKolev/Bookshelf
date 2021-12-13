import style from './Login.module.css';
import { useState, useContext } from 'react';
import { auth } from '../../firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onSuccessNotify, onErrorNotify } from '../../Notifications/Notifications';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../Helper/Context.js'; 
import { Redirect } from 'react-router';

function Login({ history }) {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const context = useContext(UserContext);
    let user = context.user;

    const onLogin = async (e) => {

        e.preventDefault();

        try {
            let user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            history.push("/");
            onSuccessNotify("Successfully logged !");
        } catch (error) {
            onErrorNotify("Wrong username or password !");
        }
    };

    
    return (
        <div className={style.loginContainer}>
        {
            !user 
            ?
            <form className={style.login} onSubmit={onLogin}>
                <h2 className={style.loginTitle}>Login to your account</h2>
                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-user login-icon" ></i>
                    <input type="text" name="email" id="email"
                        className={style.input}
                        placeholder="Type your E-mail"
                        autoFocus
                        onChange={(e) => { setLoginEmail(e.target.value); }}
                    />
                </label>
                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-key login-icon" ></i>
                    <input name="password" id="password" type="password"
                        className={style.input}
                        placeholder="Type your Password"
                        onChange={(e) => { setLoginPassword(e.target.value); }}
                    />
                </label>
                <input type="submit" value="Login" className={style.button}></input>
            </form>
            : <Redirect to="/" />
        }
        </div >
    )
}

export default Login;