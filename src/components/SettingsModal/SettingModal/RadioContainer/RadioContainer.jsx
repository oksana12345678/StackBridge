import css from "./RadioContainer.module.css";


const RadioContainer = ({children}) => {
  return (
    <div className={css["radio-container"]}>
      {children}
    </div>
  )
}

export default RadioContainer
