import clsx from "clsx";
import css from "./Button.module.css";
import { buildButtonClass } from "./buildButtonClass";

// тут я задала найузагальненіші стилі
// якщо ваша кнопка з вашого компоненту виглядає трохи інакше, можете передати пропс тип, у css модулі задати клас
// для вашого типу кнопки і додати цей варіант у функцію buildButtonClass. А також можна додавати додаткові пропси
// у майбутньому і розширювати компонент

const Button = ({ children, onClick, actionType = "submit", type }) => {
  return (
    <button
      className={clsx(css.button, css[buildButtonClass(type)])}
      onClick={onClick}
      type={actionType}
    >
      {children}
    </button>
  );
};

export default Button;
