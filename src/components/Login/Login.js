import style from './Login.module.css';

function Login() {
    return (
        <div className={style.loginContainer}>
            <div className={style.login}>
                <label className={style.label}>
                    <i  style={{color:"white",marginRight:10}} class="fas fa-user login-icon" ></i>
                    <input type="text" className={style.input} placeholder="Type your E-mail" autoFocus />
                </label>
                <label className={style.label}>
                    <i style={{color:"white", marginRight:10}} class="fas fa-key login-icon" ></i>
                    <input  type="password" className={style.input} placeholder="Type your Password" />
                </label>
                <button className={style.button}>Login</button>
            </div>
        </div>
    )
}

export default Login;