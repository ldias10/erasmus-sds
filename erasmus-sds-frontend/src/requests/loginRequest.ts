'use client'

import { FormData } from "@/components/SignUpForm";

export const loginRequest = async (email:string, password:string) => {
  try {
    const response = await fetch("http://127.0.0.1:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    });

    const responseData = await response.json();
    if (response.ok) {
      document.cookie = `access_token=${responseData.access_token}; path=/`;
      const userType = responseData.Professor === false ? 'student' : 'professor';
      try {
        const response = await fetch(`http://127.0.0.1:8080/${userType}/${responseData.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();
        sessionStorage.setItem("userData", JSON.stringify(userData));
        console.log("The User data is: ",sessionStorage.getItem("userData"));
      } catch (error) {
        console.error("Error during login to get user info:", error);
      }
    }
    // delete responseData.Admin;
    // delete responseData.Professor;
    // delete responseData.Student;
    // delete responseData.access_token;
    // const id = responseData.id;
    // delete responseData.id;
    // responseData.userId = id;


    return {
      ok: response.ok,
      body:responseData,
    };
  } catch (error) {
    return {
      ok: false,
      error: error|| "An error occurred, try logging in again",
    };
  }
};

export default loginRequest;