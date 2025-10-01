import React, { createContext, useState } from "react";

export const OptionContext = createContext();

export function OptionProvider({ children }) {
    const [option, setOption] = useState("manage_property");

    const changeOption = (params) => {
        setOption(params);
    };

    return (
        <OptionContext.Provider value={{ option, changeOption }}>
            {children}
        </OptionContext.Provider>
    );
}