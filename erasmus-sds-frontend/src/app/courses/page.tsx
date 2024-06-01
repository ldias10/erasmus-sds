"use client";
import { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
// import { getListPage, getSinglePage } from "@/lib/contentParser";
import { IoMdAddCircleOutline } from "react-icons/io";
import Link from "next/link";

export interface Course {
  id: number;
  name: string;
  description: string;
  ects: number;
  hoursOfLecture?: number;
  hoursOfLabs?: number;
  numberOfExams: number;
  isAvailable?: boolean;
  fieldOfStudyId?: number;
  studyLevelId?: number;
  FieldOfStudy?:{
    fieldOfStudyId:number;
    name:string
  }
  StudyLevel?:{
    studyLevelId:number;
    name:string
  }
  }

const Course = () => {
  const [courses, setCourses] = useState<any[]>([]);

  const [isTeacher, setIsTeacher] = useState<boolean>(true); //["student" | "teacher"]

  const [isStudent, setIsStudent] = useState<boolean>(true);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      const storedUserState = sessionStorage.getItem("userState");
      setIsTeacher(storedUserState === "teacher");
    }
  }, []);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      const storedUserState = sessionStorage.getItem("userState");
      setIsStudent(storedUserState === "student");
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/courses", {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
    
        const courses = await response.json();
        console.log("The courses are: ",courses);
        setCourses(courses);
        } catch (error) {
          console.error('Error fetching courses:', error);
          throw error;
        }
      };
      fetchCourses();
  },[]
);
  return (
    <>  
      <div className="flex justify-between items-center">
        {isTeacher && (
            <div className="flex items-center mr-auto ml-2" style={{ visibility: "hidden" }}> {/* Use ml-auto to push this div to the right */}
              <IoMdAddCircleOutline className="mr-2 text-xl" />
              <span><p>Add a course</p></span>
            </div>
        )}

        <div className="text-center flex-grow">
          <h2 className="max-md:h1 md:mb-2">Available Courses</h2>
        </div>
        {isTeacher && (
          <Link href={"/courses/addCourse"}>
            <div className="flex items-center ml-auto mr-2"> {/* Use ml-auto to push this div to the right */}
              <IoMdAddCircleOutline className="mr-2 text-xl" />
              <span><p>Add a course</p></span>
            </div>
          </Link>
        )}
      </div>
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center">
            {courses.map((course: Course, index: number) => (
              <div className={`mb-14 md:col-6 lg:col-4 ${!course.isAvailable && isTeacher? " opacity-50" : !course.isAvailable ? "hidden":""}`} key={index}>
                <CourseCard data={course} isTeacher={isTeacher} isStudent={isStudent} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
