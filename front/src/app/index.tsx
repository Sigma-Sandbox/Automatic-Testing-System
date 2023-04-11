import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { LoginModal } from "features/auth/by-pass";
import "./index.scss";
import { Login } from "pages/Login";

function App() {
    return (
        <div className={classNames("app", {}, [])}>
            <Login />
        </div>
    );
}

export default App;
