'use server'

import { cookies } from "next/headers";

const useServerFetch = async (request: string, body: string) => {
  console.log("trying a request to the server");
  try {
    const response = await fetch(request, {
      method: "PUT",
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

export default useServerFetch;