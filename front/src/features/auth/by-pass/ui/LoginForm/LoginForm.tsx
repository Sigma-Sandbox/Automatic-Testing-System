import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LoginForm.module.scss";
import { Input } from "shared/ui/Input/Input";
import lockIconSrc from "shared/assets/icon/lock.svg";
import userIconSrc from "shared/assets/icon/user.svg";

interface LoginFormProps {
    className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.loginForm, {}, [])}>
            <Input placeholder="Логин" icon={userIconSrc} />
            <Input placeholder="Пароль" icon={lockIconSrc} />
        </div>
    );
};
