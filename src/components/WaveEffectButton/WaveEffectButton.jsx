import css from "./WaveEffectButton.module.css";
import { useRef } from "react";

const WaveEffectButton = ({ children }) => {
  const btnRef = useRef();

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.classList.add(css.rippleEffect);
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  return (
    <div className={css.rippleButton} ref={btnRef} onMouseEnter={createRipple}>
      {children}
    </div>
  );
};

export default WaveEffectButton;
