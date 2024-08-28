import css from "./Section.module.css";
import clsx from "clsx";
import { buildSectionClassName } from "./SectionHelpers";

const Section = ({ children, type }) => {
  return (
    <section className={clsx(css.section, buildSectionClassName(type))}>
      {children}
    </section>
  );
};

export default Section;
