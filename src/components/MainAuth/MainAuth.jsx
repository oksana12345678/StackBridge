import css from "./MainAuth.module.css";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

const MainAuth = ({ children }) => {
  const [backgroundVisible, setBackgroundVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const bottleAnimation = useSpring({
    from: { transform: "translateY(-300%)" },
    to: { transform: "translateY(0%)" },
    config: { duration: 400 },
    delay: 100,
  });

  const shadowAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { duration: 400 },
    delay: 100,
  });

  const splashAnimation1 = useSpring({
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { duration: 400 },
    delay: 500,
  });

  const splashAnimation2 = useSpring({
    from: { opacity: 0, transform: "scale(0)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { duration: 300 },
    delay: 500,
  });

  return (
    <section
      className={`${css.bottle} ${
        backgroundVisible ? css.backgroundVisible : css.hiddenBackground
      }`}
    >
      <div className={css.container}>
        <div className={css.formContainer}>{children}</div>

        <div className={css.animationContainer}>
          <animated.svg style={bottleAnimation} className={css.bottleSvg}>
            <use href="../../../public/spriteFull.svg#icon-Bottle-Of-Water"></use>
          </animated.svg>

          {/* SVG Shadow animation */}
          <animated.svg style={shadowAnimation} className={css.shadowSvg}>
            <use href="../../../public/spriteFull.svg#icon-Shadow"></use>
          </animated.svg>

          {/* Splash animations */}
          <animated.svg style={splashAnimation1} className={css.splash1Svg}>
            <use href="../../../public/spriteFull.svg#icon-Splash-1"></use>
          </animated.svg>

          <animated.svg style={splashAnimation2} className={css.splash2Svg}>
            <use href="../../../public/spriteFull.svg#icon-Splash-2"></use>
          </animated.svg>
        </div>
      </div>
    </section>
  );
};

export default MainAuth;
