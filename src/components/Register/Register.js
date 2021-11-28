import style from './Register.module.css';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config.js'

function Register({ history }) {

    let [user, setUser] = useState(null);
    let [registerEmail, setRegisterEmail] = useState("");
    let [registerPassword, setRegisterPassword] = useState("");
    let [registerConfPassword, setRegisterConfPassword] = useState("");

    // function onRegister(e) {
    //     e.preventDefault();
    //     let formData = new FormData(e.currentTarget);
    //     console.log(formData.get('email'))
    // }

    const onRegister = async (e) => {
        e.preventDefault();
        if (registerPassword != registerConfPassword) {
            alert('Fields Password and ConfirmPassword must be the same');
        } else {
            try {
                const user = await createUserWithEmailAndPassword(auth,
                    registerEmail,
                    registerPassword);
                history.push("/")
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    return (
        <div className={style.registerContainer}>

            <form className={style.register} onSubmit={onRegister} >
                <h2 className={style.registerTitle}>Create new account</h2>

                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="far fa-envelope login-icon" >
                    </i>
                    <input name="email" id="email" type="text"
                        className={style.input}
                        placeholder="Type your E-mail"
                        autoFocus
                        onChange={(e) => { setRegisterEmail(e.target.value); }} />
                </label>

                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-key login-icon" >
                    </i>
                    <input name="password" id="password" type="password"
                        className={style.input}
                        placeholder="Type your Password"
                        onChange={(e) => { setRegisterPassword(e.target.value); }} />
                </label>

                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-key login-icon" >
                    </i>
                    <input name="confirmPassword" id="confirmPassword" type="password" className={style.input}
                        placeholder="Repeat your Password"
                        onChange={(e) => { setRegisterConfPassword(e.target.value); }} />
                </label>

                <input type="submit" value="Register" className={style.button}></input>
                {/* <p>Now logged user is: {auth.currentUser.email}</p> */}
            </form>
        </div>
    )
}

export default Register;
