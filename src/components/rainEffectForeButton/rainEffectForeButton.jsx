import { useEffect, useRef } from "react";
import css from "./RainEffectForeButton.module.css";

const RainEffectButton = ({ children }) => {
  const buttonRef = useRef(null);

  const createRipple = (button) => {
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const offsetX = Math.random() * button.clientWidth;
    const offsetY = Math.random() * button.clientHeight;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${offsetX - radius}px`;
    circle.style.top = `${offsetY - radius}px`;
    circle.classList.add(css.ripple);

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 1000);
  };

  useEffect(() => {
    const button = buttonRef.current;

    let rippleInterval;

    const startRipples = () => {
      rippleInterval = setInterval(() => createRipple(button), 500);
    };

    const stopRipples = () => {
      clearInterval(rippleInterval);
    };

    button.addEventListener("mouseenter", startRipples);
    button.addEventListener("mouseleave", stopRipples);

    return () => {
      button.removeEventListener("mouseenter", startRipples);
      button.removeEventListener("mouseleave", stopRipples);
    };
  }, []);

  return (
    <div ref={buttonRef} className={css.rippleButton}>
      {children}
    </div>
  );
};

export default RainEffectButton;
