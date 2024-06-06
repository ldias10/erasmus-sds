'use server'

import { cookies } from "next/headers";

interface ResponseData {
  [key: string]: any;
}

const requestWithAutorization = async (request: string, body: string, method:string) => {
  console.log("trying a request to the server");
  try {
    const response = await fetch(request, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: body,
      redirect: "follow",
    });
    
    let responseData;
    try {
      responseData = await response.json();
    } catch (jsonError) {
      // In case the response body is empty or not a valid JSON, assign an empty object
      responseData = {};
    }
    
    // var responseData:ResponseData = {};
    // if (response.body === null) {
    //   responseData = {};
    // }
    // else {
    //   responseData = response.json();
    // }
    return {
      ok: response.ok,
      responseData: responseData,
    };
  } catch (error) {
    return {
      ok: false,
      error: error|| "An error occurred",
    };
  }
};

export default requestWithAutorization;