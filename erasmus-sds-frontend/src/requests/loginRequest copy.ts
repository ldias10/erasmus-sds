// 'use client'
// import requestWithAuthorization from "./serverRequestWithAuthorization"


// export const logoutRequest = async () => {
//   const request:string = "http://127.0.0.1:8080/logout";
//   const body = "";
//   try {
//     const response = await requestWithAuthorization(request,body,"DELETE");

//     const responseData = await response;
//     if (response.ok) {
//       document.cookie = `access_token=${responseData.access_token}; path=/`;
//     }

//     return {
//       ok: response.ok,
//     };
//   } catch (error) {
//     return {
//       ok: false,
//       error: error|| "An error occurred, try logging in again",
//     };
//   }
// };

// export default logoutRequest;