"use client";

// import { CustomerError } from "@/lib/shopify/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

import SelectInput from './SelectInput';

export interface FormData {
  surname?: string;
  name?: string;
  email: string;
  isVerified: boolean;
  countryId?: number;
  schoolId?: number;
  studyLevelId?: number;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-11 sm:col-9 md:col-7 mx-auto">
              <div className="mb-14 text-center">
                <h2 className="max-md:h1 md:mb-2">Are you a student or a teacher?</h2>
                <div className="flex flex-col items-center">
                  <div id="studentContainer" className="flex items-center border border-black rounded">
                    
                    <Link
                      className="underline font-medium text-dark dark:text-darkmode-dark flex items-center gap-x-2"
                      href={"/sign-up/studentSignUp"}
                    >
                      <img
                      src="/images/student.png"
                      alt="student"
                      className="max-w-xs mx-auto">
                      </img>
                      Student
                    </Link>
                  </div>
                  <br></br>
                  <div id="teacherContainer" className="flex items-center border border-black rounded">
                    <Link
                      className="underline font-medium text-dark dark:text-darkmode-dark flex items-center gap-x-2"
                      href={"/sign-up/teacherSignUp"}
                    >
                      Teacher
                      <img
                      src="/images/teacher.png"
                      alt="teacher"
                      className="max-w-xs mx-auto">
                      </img>    
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
