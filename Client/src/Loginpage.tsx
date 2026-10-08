import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Loginpage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate("/homepage");
    }
    return (
    <>
        <div className="LoginPage">
            <br/>
            <h2>Login</h2>
            <br/>
            <label>Username:</label>
            <br/>
        <input className="InputFieldLoginPage" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <br/>
            <br/>
            <br/>
            <label>Password</label>
            <br/>
        <input className="InputFieldLoginPage" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
            <br/>
            <br/>
            <br/>

            <button onClick={handleLogin} className="ButtonLoginPage">Log in</button>
        </div>
    </>
    )
}