'use server'

import { cookies } from "next/headers";


const requestWithAutorization = async (request: string, body: string, method:string) => {
  console.log("trying a request to the server");
  try {
    const response = await fetch(request, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        // Assuming cookies is a function that returns cookies from the request headers
        Cookie: cookies().toString(),
      },
      body: body,
      redirect: "follow",
    });

    const responseData = await response.json();

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