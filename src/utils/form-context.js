"use client";
import React, { createContext, useState } from 'react';

export const InputContext = createContext({
    values: {},
    setValue: () => { },
});

export const InputProvider = ({ children }) => {
    const [values, setValues] = useState({});

    const setValue = (updates) => {
        setValues(prev => ({ ...prev, ...updates }));
    };

    return (
        <InputContext.Provider value={{ values, setValue }}>
            {children}
        </InputContext.Provider>
    );
};
