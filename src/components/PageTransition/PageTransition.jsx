import { useTransition, animated } from "@react-spring/web";
import { useLocation } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia.jsx";

export default function PageTransition({ children }) {
  const location = useLocation();
  const isMobil = useMedia("(max-width: 767px)");

  const getTransform = (pathname, isMobil) => {
    if (isMobil) {
      return "translateY(-100%)";
    }
    switch (pathname) {
      case "/welcome":
      case "/signup":
      case "/signin":
      case "/home":
      case "/forgot-password":
      case "/update-password":
        return "translateX(100%)";
      default:
        return "scale(0.8)";
    }
  };

  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: getTransform(location.pathname, isMobil),
    },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: {
      opacity: 0,
      transform: isMobil
        ? "translateY(100%)"
        : getTransform(location.pathname).replace("100%", "-100%"),
    },
    config: { duration: 350 },
  });

  return transitions((style) => (
    <animated.div
      style={{
        ...style,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </animated.div>
  ));
}
