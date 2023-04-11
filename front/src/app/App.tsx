import React from "react";
import "./index.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Login } from "pages/Login";

function App() {
    return (
        <div className={classNames("app", {}, [])}>
            <Login />
        </div>
    );
}

export default App;
