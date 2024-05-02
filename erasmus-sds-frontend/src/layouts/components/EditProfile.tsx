"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import SignupForm from "@/components/SignUpForm";
import { FormData } from "@/components/SignUpForm";

const EditProfile = (request:string) => {
  const router = useRouter();

  const [saveSucceeded, setSaveSucceeded] = useState(-1);

  const [userState, setUserState] = useState<string>(sessionStorage.getItem("userState") as string); //["student" | "teacher"]
  const [isStudent, setIsStudent] = useState<boolean>(userState === "student" ? true : false);

  const [formData, setFormData] = useState<FormData>(
    JSON.parse(sessionStorage.getItem("userData") as string)
  );

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([""]);
  
  const handleSave = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);
      let request:string = "http://127.0.0.1:8080/${userState}/${formData.userId}";
      console.log("The request is: ",request);
        
      const response = await fetch(request, {
        method: "PUT",
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
        setSaveSucceeded(1);
        console.log("The saveSucceeded is: ",saveSucceeded);
      } else {
        const errors = responseData.errors || [];
        setSaveSucceeded(0);
        setErrorMessages(errors);
      }
    } catch (error) {
      console.error("Error during edit profile:", error);
      setSaveSucceeded(0);
      setErrorMessages(["error"]);
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
                <h2 className="max-md:h1 md:mb-2">Edit your profile</h2>
                <p className="md:text-lg">
                  Create an account and start using...
                </p>
              </div>

              <SignupForm
                formData={formData}
                onSubmit={handleSave}
                setFormData={setFormData}
                loading={loading}
                buttonText="Save Changes"
                isStudent={isStudent}
              />

            {saveSucceeded === 1 && (
            <div className="success-message">Changes saved</div>
            )}
            {saveSucceeded === 0 && (
            <div className="error-message">Save failed</div>
            )}
            
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
