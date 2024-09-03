import { useState } from "react";

export const useToggle = () => {
  const [state, setState] = useState({
    password: false,
    repeatPassword: false,
  });

  const toggle = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return [state, toggle];
};
