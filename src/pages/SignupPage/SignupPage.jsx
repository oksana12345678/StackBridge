import SignUpForm from "../../components/SignUpForm/SignUpForm.jsx";
import css from "./SignupPage.module.css";
import backgnd from "../../Images/signIn-signUp/bottle/mobile/bottle_mobile@1x.png";
export default function RegisterPage() {
  return (
    <div className={css.div}>
      <div className={css.container}>
        <SignUpForm />
      </div>
    </div>
  );
}
