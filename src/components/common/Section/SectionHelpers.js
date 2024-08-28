import css from "./Section.module.css";

export const buildSectionClassName = (type) => {
    switch (type) {
      case "home-page":
        return css["home-section"];
      default:
        "";
    }
  };