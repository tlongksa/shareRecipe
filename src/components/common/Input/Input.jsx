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
    textAreaRows = 6,
    errorNormalPosition,
    id,
    onFocus,
    onBlur,
    title,
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
            id={id || ''}
            onFocus={onFocus}
            onBlur={onBlur}
            title={title || ''}
        />
    );

    if (type === 'textarea') {
        input = (
            <textarea
                className={`input ${inputClassName || ''}`}
                name={name}
                onChange={onChange}
                cols="30"
                rows={textAreaRows}
                value={value}
                placeholder={placeholder}
                readOnly={readOnly}
                id={id || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                title={title || ''}
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
                id={id || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                title={title || ''}
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
            {error && touched && <p className={`error-message ${errorNormalPosition ? 'normal' : ''}`}>{error}</p>}
        </div>
    );
};

export default Input;
