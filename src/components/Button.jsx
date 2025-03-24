import React from 'react';

const Button = ({ className, idName, children, onClick }) => {
    return (
        <button className={`btn px-4 py-2 bg-blue-500 text-white rounded-lg ${className}`} id={`${idName}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
