"use client"
import React, { useState, useEffect } from 'react';

import   CourseForm, {FormData} from "../courseForm"

import requestWithAuthorization from "@/requests/serverRequestWithAuthorization";

const AddCourse = () => {

  const [uploadSucceeded, setUploadSucceeded] = useState(-1);
  const [formData, setFormData] = useState<FormData>({
    isAvailable: true,
  });
  const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
        const request: string = "http://127.0.0.1:8080/course";
        const raw = JSON.stringify(formData);
    
        console.log("The request to add course is: ",request);
        console.log("The raw data of the course is: ",raw);
        
        try {
          setLoading(true);
          const postResponse = await requestWithAuthorization(request, raw, "POST");
          const response = await postResponse;
          console.log("the  response is: ",response);
          if (response.ok) {
            const data = response.responseData;
            
            setUploadSucceeded(1);
          } else {
            const errors = response.responseData.error || [];
            console.log("The errors are: ",errors);
            setUploadSucceeded(0);
          }
        } catch (error) {
          console.error("Error during edit profile:", error);
          setUploadSucceeded(0);
        } finally {
          setLoading(false);
        }
    };

return  (
    <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-11 sm:col-9 md:col-7 mx-auto">
              <div className="mb-14 text-center">
                <h2 className="max-md:h1 md:mb-2">Create a Course</h2>
                <p className="md:text-lg">
                  Create an account and start using...
                </p>
              </div>

              <CourseForm
                formData={formData}
                onSubmit={handleSignUp}
                setFormData={setFormData}
                loading={loading}
                buttonText="Upload new course"
              />

            </div>
          </div>
        </div>
      </section>
  );
};

export default AddCourse;
