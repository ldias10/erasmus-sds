"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import SignupForm from "@/components/SignUpForm";
import { FormData } from "@/components/SignUpForm";
import { set } from "date-fns";
import requestWithAuthorization from "@/requests/serverRequestWithAuthorization";

  const EditProfile = () => {
    const router = useRouter();

    const [saveSucceeded, setSaveSucceeded] = useState(-1);

    const [userState, setUserState] = useState<string>(''); //["student" | "teacher"]
    const [isStudent, setIsStudent] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({} as FormData);

    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);


    useEffect(() => {
      // Check if window is defined (browser environment)
      if (typeof window !== 'undefined') {
        const storedUserState = sessionStorage.getItem("userState");
        setUserState(storedUserState as string || ''); // Set default value if null or undefined
        if (storedUserState !== "student" && storedUserState !== "teacher") {
          router.push("/");
        }
        setIsStudent(storedUserState === "student");
        setFormData(JSON.parse(sessionStorage.getItem("userData") as string));
      }
    }, []);

  if (!isStudent && userState !== "teacher") {
    return null; // Render nothing if userState is not valid
  }

  const handleSave = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    var path = userState;
    if (path === "teacher") {
      path = "professor";
    }
    
    const request: string = `http://127.0.0.1:8080/${path}/${formData.userId}`;
    const raw = JSON.stringify(formData);

    console.log("The request is: ",request);
    console.log("The raw data is: ",raw);
    
    try {
      setLoading(true);
      console.log("The form data is:----------------dckgfthj-gfnbhgfrbf-------- ",formData);
      const editResponse = await requestWithAuthorization(request, raw, "PUT");
      const response2 = await editResponse;
      console.log("the edit response is: ",response2);
      if (response2.ok) {
        setErrorMessages([]);
        const data = response2.responseData;
        
        sessionStorage.setItem("userData", JSON.stringify(response2.responseData));
        console.log("The User data is: ",sessionStorage.getItem("userData"));
        
        setSaveSucceeded(1);
      } else {
        const errors = response2.responseData.error || [];
        setErrorMessages(errors);
        console.log("The errors are: ",errors);

        setSaveSucceeded(0);
      }
    } catch (error) {
      console.error("Error during edit profile:", error);
      setSaveSucceeded(0);
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
                disablePassword={true}
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
