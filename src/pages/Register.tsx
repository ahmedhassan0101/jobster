// src/pages/Register.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import Logo from "@/layout/components/Logo";
import FormRow from "@/shared/components/FormRow";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { loginUser, registerUser } from "@/store/user/userSlice";

const RegisterWrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.background};

  .card {
    width: 90vw;
    max-width: 420px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 0.5rem;
    border-top: 4px solid ${({ theme }) => theme.colors.primary[600]};
    box-shadow: ${({ theme }) => theme.shadows[2]};
    padding: 2.5rem 2rem;
    transition: ${({ theme }) => theme.transition};

    &:hover {
      box-shadow: ${({ theme }) => theme.shadows[3]};
    }
  }

  .card-header {
    text-align: center;
    margin-bottom: 1.75rem;

    .logo-wrap {
      margin-bottom: 1.25rem;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.grey[800]};
      margin: 0;
    }
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }


  .toggle-row {
    text-align: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.grey[500]};

    button {
      background: transparent;
      border: none;
      color: ${({ theme }) => theme.colors.primary[600]};
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      margin-left: 0.375rem;
      padding: 0;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

interface FormValues {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
}

const initialState: FormValues = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState<FormValues>(initialState);
  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  // Navigate immediately on successful auth — no arbitrary delay
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <RegisterWrapper>
      <div className="card">
        <div className="card-header">
          <div className="logo-wrap">
            <Logo />
          </div>
          <h3>{values.isMember ? "Welcome back" : "Create account"}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="fields">
            {!values.isMember && (
              <FormRow
                type="text"
                name="name"
                value={values.name}
                handleChange={handleChange}
                labelText="Full name"
              />
            )}
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading
              ? "Please wait..."
              : values.isMember
                ? "Login"
                : "Register"}
          </button>

          <button
            type="button"
            className="btn btn-outline btn-block"
            disabled={isLoading}
            onClick={() =>
              dispatch(
                loginUser({ email: "testUser@test.com", password: "secret" }),
              )
            }
          >
            {isLoading ? "Please wait..." : "Try demo account"}
          </button>

          <p className="toggle-row">
            {values.isMember ? "New to Jobster?" : "Already have an account?"}
            <button
              type="button"
              onClick={() =>
                setValues((prev) => ({
                  ...initialState,
                  isMember: !prev.isMember,
                }))
              }
            >
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </RegisterWrapper>
  );
};

export default Register;
