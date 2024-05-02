"use client";

// import { CustomerError } from "@/lib/shopify/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import SignupForm from "@/components/SignUpForm";
import { FormData } from "@/components/SignUpForm";

const StudentSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    surname: "",
    name: "",
    email: "",
    isVerified: false,
    countryId: 0,
    schoolId: 0,
    studyLevelId: 0,
    password: "",
    
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8080/student", {
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
        sessionStorage.setItem("userData", JSON.stringify(responseData));
        console.log("The User data is: ",sessionStorage.getItem("userData"));

        sessionStorage.setItem("userState", "student");
        console.log(sessionStorage.getItem("userState"));

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

              <SignupForm
                formData={formData}
                onSubmit={handleSignUp}
                setFormData={setFormData}
                loading={loading}
                buttonText="Sign Up"
                isStudent={true}
              />

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

export default StudentSignUp;
