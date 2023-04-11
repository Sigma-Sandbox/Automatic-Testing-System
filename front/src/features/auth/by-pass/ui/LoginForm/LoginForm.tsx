import React, { useCallback, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LoginForm.module.scss";
import { Input } from "shared/ui/Input/Input";
import lockIconSrc from "shared/assets/icon/lock.svg";
import userIconSrc from "shared/assets/icon/user.svg";
import {
    Button,
    ColorButton,
    SizeButton,
    ThemeButton,
} from "shared/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../model/slice/loginSlice";
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";

interface LoginFormProps {
    className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { className } = props;

    const dispatch = useDispatch();
    const { username, password, error, isLoading } = useSelector(getLoginState);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(() => {
        // dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.wrap, {}, [])}>
            <div className={cls.loginForm}>
                <Input
                    className={cls.input}
                    placeholder="Логин"
                    icon={userIconSrc}
                    value={username}
                    onChange={onChangeUsername}
                />
                <Input
                    className={cls.input}
                    placeholder="Пароль"
                    icon={lockIconSrc}
                    value={password}
                    onChange={onChangePassword}
                />
            </div>

            <Button
                theme={ThemeButton.BACKGROUND}
                color={ColorButton.INVERT_BACKGROUND_COLOR}
                size={SizeButton.L}
                className={cls.button}
            >
                Войти
            </Button>
        </div>
    );
};
