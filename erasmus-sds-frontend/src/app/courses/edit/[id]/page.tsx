"use client"
import React, { useState, useEffect } from 'react';

import   CourseForm, {FormData} from "../../courseForm"

import { useRouter, useParams } from "next/navigation";

import requestWithAuthorization from "@/requests/serverRequestWithAuthorization";

const EditCourse = () => {

  const [saveSucceeded, setSaveSucceeded] = useState(-1);
  const [formData, setFormData] = useState<FormData>({
  });
  const [loading, setLoading] = useState(false);

  const params = useParams();
        const router = useRouter();
        const { id } = params;

        useEffect(() => {
            if (id) {
            // Fetch course data based on id
            // Replace this with your actual data fetching logic
            const fetchCourse = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/course/${id}`, {
                        method: 'GET',
                        headers: {
                        'Accept': 'application/json'
                        }
                    });
            
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
            
                const course = await response.json();
                console.log("The course is: ",course);
                setFormData(course);
                } catch (error) {
                    console.error(`Error fetching course with id ${id}:`, error);
                    throw error;
                }
                };
                fetchCourse();
            }
        }, [id]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const request: string = `http://127.0.0.1:8080/course/${id}`;
        const raw = JSON.stringify(formData);
    
        console.log("The request to edit the course is: ",request);
        console.log("The raw data of the course is: ",raw);
        
        try {
          setLoading(true);
          const editResponse = await requestWithAuthorization(request, raw, "PUT");
          const response = await editResponse;
          console.log("the  response is: ",response);
          if (response.ok) {
            const data = response.responseData;
            
            setSaveSucceeded(1);
          } else {
            const errors = response.responseData;
            console.log("The errors are: ",errors);
            setSaveSucceeded(0);
          }
        } catch (error) {
          console.error("Error during edit of the course:", error);
          setSaveSucceeded(0);
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
                <h2 className="max-md:h1 md:mb-2">Edit Course</h2>
              </div>

              <CourseForm
                formData={formData}
                onSubmit={handleSave}
                setFormData={setFormData}
                loading={loading}
                buttonText="Save changes"
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
  );
};

export default EditCourse;
