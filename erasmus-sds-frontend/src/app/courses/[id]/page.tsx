"use client"
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Course } from "@/app/courses/page";
import Comments from "@/partials/Comments";

const CourseDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch course data based on id
      // Replace this with your actual data fetching logic
      const fetchCourse = async () => {
        try {
            const response = await fetch(`http://localhost:8080/course/${id}?StudyLevel=true&FieldOfStudy=true`, {
                method: 'GET',
                headers: {
                'Accept': 'application/json'
                }
            });
      
          if (!response.ok) {
            throw new Error('Failed to fetch courses');
          }
      
          const course = await response.json();
          console.log("The course is: ",course);
          setCourse(course);
          } catch (error) {
            console.error(`Error fetching course with id ${id}:`, error);
            throw error;
          }
        };
        fetchCourse();
    }
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 rounded-lg shadow-md">
      <div className="flex justify-center">
        <div>
          <h1 className="text-2xl font-bold text-center mb-4">{course.name}</h1>
        </div>
      </div>
      <div className="flex-row">
        <div className="flex justify-between">
          <div className="text-left">
            <p className="text-sm font-medium">ECTS: {course.ects}</p>
            <p className="text-sm font-medium">Hours of Lecture: {course.hoursOfLecture}</p>
            <p className="text-sm font-medium">Hours of Labs: {course.hoursOfLabs}</p>
            <p className="text-sm font-medium">Number of Exams: {course.numberOfExams}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Study Level: {course.StudyLevel?.name}</p>
            <p className="text-sm font-medium">Field of Study: {course.FieldOfStudy?.name}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="mt-2 text-base">{course.description}</p>
      </div>
      <Comments id = {id} />
    </div>
  );
};

export default CourseDetail;
