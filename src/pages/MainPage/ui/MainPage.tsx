import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./MainPage.module.scss";

interface MainProps {
    className?: string;
}

export const MainPage: React.FC<MainProps> = (props) => {
    const { className = "" } = props;

    return <div className={classNames(cls.Main, {}, [className])}>main</div>;
};
