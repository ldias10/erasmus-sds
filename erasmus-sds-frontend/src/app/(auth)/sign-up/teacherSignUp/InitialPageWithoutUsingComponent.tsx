"use client";

// import { CustomerError } from "@/lib/shopify/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

export interface FormData {
  surname?: string;
  name?: string;
  email: string;
  isVerified: boolean;
  password: string;
}

const TeacherSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    surname: "",
    name: "",
    email: "",
    isVerified: false,
    password: "",
    
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8080/professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("The Response is---------------------------:",response
        ,"And response.ok is: ",response.ok
      );

      if (response.ok) {
        setErrorMessages([]);
        const data = responseData;
        localStorage.setItem("user", JSON.stringify(data));
        const userData = localStorage.getItem("user");

        //not functionnal yet cuz backend is not sending back the user data (if i'm correct)
        // if (userData) {
        //   const user = JSON.parse(userData);
        //   console.log("the userData",user); // Do something with the user data
        // } else {
        //   console.log("User data not found in localStorage");
        // }

        //so in the mean time, i'm doing this. Same applies in the student signup page and all page needing user data
        localStorage.setItem("userState", "teacher");
        console.log(localStorage.getItem("userState"));
        router.push("/");
      } else {
        const errors = responseData.errors || [];
        setErrorMessages(errors);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-11 sm:col-9 md:col-7 mx-auto">
              <div className="mb-14 text-center">
                <h2 className="max-md:h1 md:mb-2">Create an account</h2>
                <p className="md:text-lg">
                  Create an account and start using...
                </p>
              </div>

              <form onSubmit={handleSignUp}>
                <div>
                  <label className="form-label">Name</label>
                  <input
                    name="surname"
                    className="form-input"
                    placeholder="Enter your first name"
                    type="text"
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                <div className="pt-2">
                  <input
                    name="lastName"
                    className="form-input"
                    placeholder="Enter your last name"
                    type="text"
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                <div>
                  <label className="form-label mt-8">Email Address</label>
                  <input
                    name="email"
                    className="form-input"
                    placeholder="Type your email"
                    type="email"
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                <div>
                  <label className="form-label mt-8">Password</label>
                  <input
                    name="password"
                    className="form-input"
                    placeholder="********"
                    type="password"
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                {/* {errorMessages.map((error: CustomerError) => (
                  <p
                    key={error.code}
                    className="ont-medium text-red-500 truncate mt-2"
                  >
                    *{error.message}
                  </p>
                ))} */}

                <button
                  type="submit"
                  className="btn btn-primary md:text-lg md:font-medium w-full mt-10"
                >
                  {loading ? (
                    <BiLoaderAlt className={`animate-spin mx-auto`} size={26} />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              <div className="flex gap-x-2 text-sm md:text-base mt-6">
                <p className="text-light dark:text-darkmode-light">
                  I have read and agree to the
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/terms-services"}
                >
                  Terms & Conditions
                </Link>
              </div>

              <div className="flex gap-x-2 text-sm md:text-base mt-2">
                <p className="text-light dark:text-darkmode-light">
                  Have an account?
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/login"}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeacherSignUp;
