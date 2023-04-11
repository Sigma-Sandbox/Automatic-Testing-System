import React, { useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Toggle_ios.module.scss";

interface Toggle_iosProps {
    className?: string;
    onChange: () => void;
    isUser: boolean;
}

export const Toggle_ios: React.FC<Toggle_iosProps> = (props) => {
    const { className = "", onChange, isUser } = props;

    return (
        <div className={classNames(cls.wrap, {}, [className])}>
            <span className={classNames(cls.text, { [cls.bold]: isUser }, [])}>
                Соискатель
            </span>
            <label className={classNames(cls.toggle_ios, {}, [])}>
                <input type="checkbox" onChange={onChange} />
                <i></i>
            </label>
            <span className={classNames(cls.text, { [cls.bold]: !isUser }, [])}>
                Соотрудник
            </span>
        </div>
    );
};
