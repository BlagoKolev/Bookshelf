import style from './Register.module.css';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config.js';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from '../../Helper/Context.js';


function Register({ history }) {

    // let [user, setUser] = useState(null);
    let [registerEmail, setRegisterEmail] = useState("");
    let [registerPassword, setRegisterPassword] = useState("");
    let [registerConfPassword, setRegisterConfPassword] = useState("");

    const context = useContext(UserContext);
    let user = context.user;

    // function onRegister(e) {
    //     e.preventDefault();
    //     let formData = new FormData(e.currentTarget);
    //     console.log(formData.get('email'))
    // }

    const registrationSuccessNotify = () => {
        toast.success("Registration Successfull !", { position: toast.POSITION.TOP_CENTER });
    };

    const passwordsMatchNotify = () => {
        toast.warning("Password and ConfirmPassword must be the same !", { position: toast.POSITION.TOP_CENTER });
    };

    const onRegister = async (e) => {

        e.preventDefault();

        if (registerPassword != registerConfPassword) {
            passwordsMatchNotify();
        } else {

            try {
                const user = await createUserWithEmailAndPassword(auth,
                    registerEmail,
                    registerPassword);
                history.push("/")
                registrationSuccessNotify();
            } catch (error) {
                console.log(error.message);
            }

        }
    };

    return (

        <div className={style.registerContainer}>
            {!user ?
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
                :
                <Redirect to="/" />
            }
        </div>
    )
}

export default Register;
