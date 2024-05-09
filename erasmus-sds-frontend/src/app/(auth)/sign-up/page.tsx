"use client";

// import { CustomerError } from "@/lib/shopify/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useTheme } from "next-themes";

import SelectInput from '../../../layouts/components/SelectInput';

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
  const { theme, setTheme } = useTheme() ; 
  const [studentImagePath, setStudentImagePath] = useState({
    light: "/images/student.png",
    dark: "/images/student_dark.png",
  });
  const [teacherImagePath, setTeacherImagePath] = useState({
    light: "/images/teacher.png",
    dark: "/images/teacher_dark.png",
  });
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
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
                      className="underline font-medium flex items-center gap-x-2"
                      href={"/sign-up/studentSignUp"}
                    >
                         <img
    src={(theme === "light" || theme === "dark") ? studentImagePath[theme] : studentImagePath.light}
    alt="teacher"
    className="max-w-xs mx-auto"
/>
                      Student
                    </Link>
                  </div>
                  <br></br>
                  <div id="teacherContainer" className="flex items-center border border-black rounded">
                    <Link
                      className="underline font-medium flex items-center gap-x-2"
                      href={"/sign-up/teacherSignUp"}
                    >
                      Teacher
                      <img
    src={(theme === "light" || theme === "dark") ? teacherImagePath[theme] : teacherImagePath.light}
    alt="teacher"
    className="max-w-xs mx-auto"
/>

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