'use client'

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
    }

    return {
      ok: response.ok,
    };
  } catch (error) {
    return {
      ok: false,
      error: error|| "An error occurred, try logging in again",
    };
  }
};

export default loginRequest;