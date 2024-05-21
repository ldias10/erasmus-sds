import React, { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import SelectInput from '@/components/SelectInput';

export interface FormData {
    name?: string;
    description?: string;
    ects?: number;
    hoursOfLecture?: number;
    hoursOfLabs?: number;
    numberOfExams?: number;
    isAvailable?: boolean;
    fieldOfStudyId?: number;
    studyLevelId?: number;
  }

interface SignUpFormProps {
  formData: FormData;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  loading: boolean;
  buttonText: string;
  
}


const CourseForm = ({ formData, onSubmit, setFormData, loading=false, buttonText="Upload"}: SignUpFormProps) => {
  const [studyLevels, setStudyLevels] = useState([]);
  const [fieldOfStudy, setFieldOfStudy] = useState([]);

  console.log("courseData: ",formData);

  useEffect(() => {
    const fetchStudyLevels = async () => {
        try {
          const response = await fetch("http://localhost:8080/studyLevels", {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch study levels');
          }
      
          const studyLevels = await response.json();
          setStudyLevels(studyLevels);
          console.log("studyLevels: ",studyLevels);
          } catch (error) {
            console.error('Error fetching study levels:', error);
            throw error;
          }
    };

    const fetchFieldOfStudy = async () => {
        try {
          const response = await fetch("http://localhost:8080/fieldsOfStudy", {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch field of study');
          }
      
          const fieldOfStudy = await response.json();
          setFieldOfStudy(fieldOfStudy);
          console.log("fieldOfStudy: ",fieldOfStudy);
          } catch (error) {
            console.error('Error fetching field of study:', error);
            throw error;
          }
    };

    fetchStudyLevels();
    fetchFieldOfStudy();
  
  },[]);
  
  
 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        console.log(formData);
      };

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        });
        };

return  (
    <form onSubmit={onSubmit}>
      <div>
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-input"
          placeholder="Enter course name"
          type="text"
          onChange={handleChange}
          value={formData.name}
          required={true}
        />
      </div>

      <div className="pt-2">
        <label className="form-label">Description</label>
        <input
        name="description"
        className="form-input"
        placeholder="Enter course description"
        type="text"
        onChange={handleChange}
        value={formData.description}
        required={true}
        />
      </div>

      <div className="pt-2">
        <label className="form-label">ECTS</label>
        <input
        name="ects"
        className="form-input"
        placeholder="Enter ECTS"
        type="number"
        value={formData.ects}
        onChange={handleChange}
        required={true}
        />
      </div>

      <div className="pt-2">
        <label className="form-label">Hours of Lecture</label>
        <input
        name="hoursOfLecture"
        className="form-input"
        placeholder="Enter hours of lecture"
        type="number"
        value={formData.hoursOfLecture}
        onChange={handleChange}
        required={true}
        />
      </div>

      <div className="pt-2">
        <label className="form-label">Hours of Labs</label>
        <input
        name="hoursOfLabs"
        className="form-input"
        placeholder="Enter hours of labs"
        type="number"
        value={formData.hoursOfLabs}
        onChange={handleChange}
        required={true}
        />
      </div>

      <div className="pt-2">
        <label className="form-label">Number of Exams</label>
        <input
        name="numberOfExams"
        className="form-input"
        placeholder="Enter number of exams"
        type="number"
        value={formData.numberOfExams}
        onChange={handleChange}
        required={true}
        />
      </div>

      <div className="pt-2">
        <label className="form-label">Is Available</label>
        <input
        name="isAvailable"
        className="form-checkbox"
        type="checkbox"
        checked={formData.isAvailable}
        onChange={handleCheckboxChange}
        />
      </div>

      <div>
        <SelectInput
            title='Study Level'
            name='studyLevelId'
            onChange={handleChangeSelect}
            options={studyLevels}
            defaultValue={formData.studyLevelId ? formData.studyLevelId.toString() : "select"}
        />
      </div>

        <div>
            <SelectInput
                title='Field of Study'
                name='fieldOfStudyId'
                onChange={handleChangeSelect}
                options={fieldOfStudy}
                defaultValue={formData.fieldOfStudyId ? formData.fieldOfStudyId.toString() : "select"}
            />
        </div>

      <button
        type="submit"
        className="btn btn-primary md:text-lg md:font-medium w-full mt-10"
      >
        {loading ? (
          <BiLoaderAlt className={`animate-spin mx-auto`} size={26} />
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
};

export default CourseForm;
