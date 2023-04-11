import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Login.module.scss";
import { LoginModal } from "features/auth/by-pass";
import IbgSrc from "shared/assets/bg_main.png";

interface LoginProps {
    className?: string;
}

export const Login: React.FC<LoginProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.login, {}, [])}>
            <LoginModal />
        </div>
    );
};
