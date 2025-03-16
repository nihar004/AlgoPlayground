import React, { createContext, useContext, useState, useCallback } from "react";
const WarningContext = createContext();

// Custom hook to use the context
export const useWarnings = () => useContext(WarningContext);

export const WarningProvider = ({ children }) => {
  const [warnings, setWarnings] = useState([]);

  const addWarning = useCallback((message, duration = 3000) => {
    setWarnings((prevWarnings) => {
      if (!prevWarnings.some((warning) => warning.message === message)) {
        return [
          ...prevWarnings,
          {
            id: Date.now(),
            message,
            timestamp: Date.now(),
            duration,
          },
        ];
      }
      return prevWarnings;
    });
  }, []);

  const removeWarning = useCallback((id) => {
    setWarnings((prevWarnings) =>
      prevWarnings.filter((warning) => warning.id !== id)
    );
  }, []);

  return (
    <WarningContext.Provider value={{ warnings, addWarning, removeWarning }}>
      {children}
    </WarningContext.Provider>
  );
};
