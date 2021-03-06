import style from './Login.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react';
import { auth } from '../../firebase-config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onSuccessNotify, onErrorNotify } from '../../Notifications/Notifications';
import { UserContext } from '../../Context/Context.js';
import { Redirect } from 'react-router-dom';

function Login({ history }) {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const { user } = useContext(UserContext);

    const onLogin = async (e) => {

        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            history.push("/");
            onSuccessNotify("Successfully logged !");
        } catch (error) {
            onErrorNotify("Wrong username or password !");
        }
    };


    return (
        <div className={style.loginContainer}>
            <title>Log-in</title>
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