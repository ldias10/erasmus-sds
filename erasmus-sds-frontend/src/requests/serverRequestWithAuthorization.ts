'use server'

import { cookies } from "next/headers";


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
    const res = await response;
    var responseData = {};
    if (res.body === null) {
      responseData = {};
    }
    else {
      responseData = res.json();
    }
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