"use client";
import { useState, useEffect, FormEvent } from "react";
import CourseCard from "@/components/CourseCard";
// import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";

export interface Course {
  name: string;
  description: string;
  ects: number;
  hoursOfLecture?: number;
  hoursOfLabs?: number;
  numberOfExams: number;
  isAvailable?: boolean;
  fieldOfStudyId?: number;
  studyLevelId?: number;
  }

const Course = () => {
  const [courses, setCourses] = useState<any[]>([]);
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
        setCourses(courses);
        } catch (error) {
          console.error('Error fetching courses:', error);
          throw error;
        }
      };
      fetchCourses();
  },
);
  return (
    <>  
      <PageHeader/>
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center">
            {courses.map((course: Course, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <CourseCard data={course} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
