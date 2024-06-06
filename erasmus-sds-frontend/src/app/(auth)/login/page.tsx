"use client";

import {loginRequest} from "@/requests/loginRequest";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FormData } from "@/components/SignUpForm";


const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    surname: "",
    name: "",
    email: "",
    isVerified: true,
    countryId: 0,
    schoolId: 0,
    studyLevelId: 0,
    password: "",
    
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);

    try {

        setErrorMessages([]);
        try {
          const loginResponse = await loginRequest(formData.email, formData.password);
          const loginResponseData = await loginResponse;
          console.log("The login response is: ", loginResponseData);
          if (!loginResponse.ok) {
            const errors = loginResponseData.error || [];
            console.log("Error:", errors);
          } else {
            if (loginResponseData.body) {
              setFormData(loginResponseData.body);
              // sessionStorage.setItem("userData", JSON.stringify(loginResponseData.body));
              // console.log("The User data is: ", sessionStorage.getItem("userData"));
              const userType = loginResponseData.body.Professor === false ? 'student' : 'teacher';
              sessionStorage.setItem("userState", userType);
              window.dispatchEvent(new Event("storage"));
              router.push("/");
            }
          }
        }
        catch (error) {
          console.error("Error during login:", error);
        }

        
      // } else if (response.status === 401 || response.status === 404) {
      //   setErrorMessages([responseData.error || "Invalid email or password."]);
      // } else if (response.status === 500) {
      //   setErrorMessages(["Server error, please try again later."]);
      // } else {
      //   setErrorMessages(["An unexpected error occurred."]);
      // }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessages(["An unexpected error occurred."]);
    } finally {
      setLoading(false);
    };
  }

  return (
    <>
      <title>Login</title>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-11 sm:col-9 md:col-7 mx-auto">
              <div className="mb-14 text-center">
                <h2 className="max-md:h1 md:mb-2">Login</h2>
                <p className="md:text-lg">Welcome back! Please enter your details to log in.</p>
              </div>

              <form onSubmit={handleLogin}>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    placeholder="Type your email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    required
                  />
                </div>

                <div>
                  <label className="form-label mt-8">Password</label>
                  <input
                    className="form-input"
                    placeholder="********"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    required
                  />
                </div>

                {errorMessages.map((error, index) => (
                  <p key={index} className="font-medium text-red-500 truncate mt-2">
                    {error}
                  </p>
                ))}

                <button
                  type="submit"
                  className="btn btn-primary md:text-lg md:font-medium w-full mt-10"
                  disabled={loading}
                >
                  {loading ? <BiLoaderAlt className="animate-spin mx-auto" size={26} /> : "Log In"}
                </button>
              </form>

              <div className="flex gap-x-2 text-sm md:text-base mt-4">
                <p className="text-light dark:text-darkmode-light">Don&apos;t have an account?</p>
                <Link className="underline font-medium text-dark dark:text-darkmode-dark" href="/sign-up">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
