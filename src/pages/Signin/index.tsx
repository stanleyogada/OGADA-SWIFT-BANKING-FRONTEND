import { Link } from "react-router-dom";
import useSignin from "./hooks/useSignin";
import SigninWrapper from "./SigninWrapper";
import Button from "../../components/Button";
import PhoneInput from "../../components/Input/PhoneInput";
import PasswordInput from "../../components/Input/PasswordInput";

const Signin = () => {
  const { handleSubmit, register, mutationState } = useSignin();

  return (
    <SigninWrapper>
      {mutationState.isError && <p data-testid="error"></p>}

      <header>
        <h1 className="page-title">Sign In</h1>
      </header>

      <main className="content">
        <h2 className="sub-title">Welcome Back!</h2>

        <form onSubmit={handleSubmit()} className="form">
          <div className="form__input-list">
            <PhoneInput
              type="text"
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: true,
              })}
            />
            <PasswordInput
              type="password"
              placeholder="Enter 6 digits login passcode"
              {...register("loginPasscode", {
                required: true,
                maxLength: 6,
                minLength: 6,
              })}
            />
          </div>

          <div className="form__actions">
            <div className="form__actions-top">
              <label htmlFor="remember-login-passcode" className="form__checkbox">
                <input type="checkbox" id="remember-login-passcode" />
                Remember login passcode
              </label>

              <Link to="#" className="form__link">
                Forgot login passcode?
              </Link>
            </div>

            <Button type="submit" disabled={mutationState.isLoading} className="form__actions-bottom">
              Sign In
              {mutationState.isLoading && <p data-testid="loading"></p>}
            </Button>
          </div>
        </form>
      </main>
    </SigninWrapper>

    // <form onSubmit={handleSubmit2((data) => console.log(data))}>
    //   <input
    //     type="text"
    //     placeholder="First Name"
    //     {...register("firstName", {
    //       required: true,
    //     })}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Last Name"
    //     {...register("lastName", {
    //       required: true,
    //     })}
    //   />

    //   <button type="submit">Submit</button>
    // </form>
  );
};

export default Signin;
