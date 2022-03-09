import { Button } from "@material-ui/core";
import {auth, provider} from "./firebase";
import React from "react";
import "./Login.css";

function Login() {
    const signIn = e => {
        //do clever google login
        auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
    }

    return (
    <div className='login'>
        <h2>Login page</h2>

        <div className="login_logo">
             
        </div>

        <Button onClick={signIn}>Sign In</Button>
    </div>
    );
}

export default Login;