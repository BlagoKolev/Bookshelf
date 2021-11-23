import style from './Register.module.css';

function Register() {

    function onRegister(e) {
       e.preventDefault();
       let formData = new FormData(e.currentTarget);
       console.log(formData.get('email'))
    }

    return (
        <div className={style.registerContainer}>
            <form className={style.register} onSubmit={onRegister}>
                <h2 className={style.registerTitle}>Create new account</h2>

                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="far fa-envelope login-icon" ></i>
                    <input name="email" id="email" type="text" className={style.input} placeholder="Type your E-mail" autoFocus />
                </label>

                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-user login-icon" ></i>
                    <input name="username" id="username" type="text" className={style.input} placeholder="Type your Username" />
                </label>

                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-key login-icon" ></i>
                    <input name="password" id="password" type="password" className={style.input} placeholder="Type your Password" />
                </label>

                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-key login-icon" ></i>
                    <input  name="confirmPassword" id="confirmPassword" type="password" className={style.input} placeholder="Repeat your Password" />
                </label>
                <input type="submit" value="Register" className={style.button}></input>
            </form>
        </div>
    )
}

export default Register;
