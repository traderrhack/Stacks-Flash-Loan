import React from 'react';
import './Container.css';

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="container">{children}</div>;
};