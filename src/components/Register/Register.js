import style from './Register.module.css';

function Register() {
    return (
        <div className={style.loginContainer}>
            <div className={style.login}>
                <h2 className={style.loginTitle}>Create new account</h2>
                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} class="far fa-envelope login-icon" ></i>
                    <input type="text" className={style.input} placeholder="Type your E-mail" autoFocus />
                </label>
                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} class="fas fa-user login-icon" ></i>
                    <input type="text" className={style.input} placeholder="Type your Username" />
                </label>
                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} class="fas fa-key login-icon" ></i>
                    <input type="password" className={style.input} placeholder="Type your Password" />
                </label>
                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} class="fas fa-key login-icon" ></i>
                    <input type="password" className={style.input} placeholder="Repeat your Password" />
                </label>
                <button className={style.button}>Create</button>
            </div>
        </div>
    )
}

export default Register;
