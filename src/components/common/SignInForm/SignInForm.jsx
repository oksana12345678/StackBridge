import { Link } from "react-router-dom";
import css from "./SignInForm.module.css";
import { signinInputs } from "./SignInFormData.js";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={css.signinPageWraper}>
      <form className={css.signinPageForm} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={css.signinPageTitle}>Sign In</h4>
        {signinInputs.map((input, index) => (
          <input
            key={index}
            label={input.label}
            name={input.name}
            placeholder={input.placeholder}
            {...register(input.name)}
            className={errors[input.name] ? css.error : ""}
          />
        ))}

        <button className={css.signinPageButton} type="submit">
          Sign In
        </button>
        <Link className={css.signinPageLink} to={"/forgot-password"}>
          Forgot password?
        </Link>
        <Link className={css.signinPageLink} to={"/signup"}>
          Sign up
        </Link>
      </form>

      <div className={css.signinPageBottle}></div>
    </div>
  );
};

export default SignInForm;
