"use client";
import React, { createContext, useState } from 'react';

export const PageContext = createContext({
    page: {},
    setPage: () => { },
});

export const PageProvider = ({ children }) => {
    const [page, setPages] = useState({});

    const setPage = (updates) => {
        setPages(prev => ({ ...prev, ...updates }));
    };

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
};
