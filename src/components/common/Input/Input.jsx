import React from 'react';
import './index.scss';

const Input = ({
    type,
    name,
    value,
    onChange,
    placeholder,
    children,
    label,
    readOnly,
    direction = '',
    error,
    touched,
    shouldHasAsterisk,
    labelShouldBold,
    containerNoMarginBottom,
    className,
    inputClassName,
}) => {
    let input = (
        <input
            className={`input ${inputClassName || ''}`}
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            autoComplete="off"
        />
    );

    if (type === 'textarea') {
        input = (
            <textarea
                className={`input ${inputClassName || ''}`}
                name={name}
                onChange={onChange}
                cols="30"
                rows="6"
                value={value}
                placeholder={placeholder}
                readOnly={readOnly}
            />
        );
    }

    if (type === 'select') {
        input = (
            <select
                className={`input ${inputClassName || ''}`}
                name={name}
                onChange={onChange}
                value={value}
                readOnly={readOnly}
            >
                {children}
            </select>
        );
    }

    return (
        <div className={`input-wrapper ${direction} ${className || ''}`}>
            <div className={`input-container ${direction} ${containerNoMarginBottom ? 'mb-0' : ''}`}>
                {label && (
                    <label className={`${labelShouldBold ? 'should-bold' : ''}`}>
                        {label} {shouldHasAsterisk && <span>*</span>}
                    </label>
                )}
                {input}
            </div>
            {error && touched && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Input;
