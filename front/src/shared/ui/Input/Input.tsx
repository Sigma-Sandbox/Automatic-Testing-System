import React, { InputHTMLAttributes, memo, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    type?: string;
    placeholder?: string;
    icon?: string;
}

export const Input = memo((props: InputProps) => {
    const {
        className = "",
        value,
        onChange,
        type = "text",
        placeholder,
        icon,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.inputWrapper, {}, [className])}>
            {icon && <img src={icon} alt="icon input" className={cls.icon} />}
            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={classNames(cls.input, {}, [])}
                placeholder={placeholder}
                {...otherProps}
            />
        </div>
    );
});
