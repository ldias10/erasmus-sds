import React, { useState, useEffect } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import SelectInput from './SelectInput';
import { Option } from './SelectInput';

export interface FormData {
  surname: string;
  name: string;
  email: string;
  isVerified: boolean;
  countryId?: number;
  schoolId?: number;
  studyLevelId?: number;
  password: string;
  userId?: number;
  access_token?: string;
  Professor?: boolean;
  }

interface SignUpFormProps {
  formData: FormData;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  loading: boolean;
  buttonText: string;
  isStudent: boolean;
  disablePassword?: boolean;
  
}


const SignUpForm = ({ formData, onSubmit, setFormData, loading, buttonText, isStudent, disablePassword=false }: SignUpFormProps) => {
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [schools, setSchools] = useState([]);
  const [studyLevels, setStudyLevels] = useState([]);

  console.log("userData: ",formData);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:8080/countries", {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
    
        const countries = await response.json();
        setCountries(countries);
        console.log(countries);
        } catch (error) {
          console.error('Error fetching countries:', error);
          throw error;
        }
      };

    const fetchUniversities = async () => {
      try {
        const response = await fetch("http://localhost:8080/universities", {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch universities');
        }
    
        const universities = await response.json();
        setUniversities(universities);
        console.log("universities: ",universities);
        } catch (error) {
          console.error('Error fetching universities:', error);
          throw error;
        }
    };
    
    const fetchSchools = async () => {
        try {
          const response = await fetch("http://localhost:8080/schools", {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch schools');
          }
      
          const schools = await response.json();
          setSchools(schools);
          console.log("schools: ",schools);
          } catch (error) {
            console.error('Error fetching schools:', error);
            throw error;
          }
    };

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
    
  if(isStudent){
    // Call the function to fetch countries
    fetchCountries();
    fetchUniversities();//useless for now but will be usefull once i can get schools by university
    fetchSchools();
    fetchStudyLevels();
  }
  
  },[isStudent]);
  
  
 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        console.log(formData);
      };

      const handleChangeSelect = (name: string, selectedOption: Option | null): void => {
        setFormData({
          ...formData,
          [name]: selectedOption ? selectedOption.id : '',
        });
      };

return  (
    <form onSubmit={onSubmit}>
      <div>
        <label className="form-label">Name</label>
        <input
          name="surname"
          className="form-input"
          placeholder="Enter your first name"
          type="text"
          onChange={handleChange}
          value={formData.surname}
          required={true}
        />
      </div>

      <div className="pt-2">
        <input
          name="name"
          className="form-input"
          placeholder="Enter your last name"
          type="text"
          onChange={handleChange}
          value={formData.name}
          required={true}
        />
      </div>

      <div>
        <label className="form-label mt-8">Email Address</label>
        <input
          name="email"
          className="form-input"
          placeholder="Type your email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          required={true}
        />
      </div>

      {isStudent === true && (
        <div>
          {/* This div is only shown if userRole is "student" */}
          <div>
            <SelectInput
                      title='Country'
                      name='countryId'
                      onChange={handleChangeSelect}
                      options={countries}
                      defaultValue={formData.countryId ? formData.countryId.toString() : "select"}
            />
          </div>
          <SelectInput
                      title='School'
                      name='schoolId'
                      onChange={handleChangeSelect}
                      options={schools}
                      defaultValue={formData.schoolId ? formData.schoolId.toString() : "select"}
            />
                <div>
                  <SelectInput
                      title='Study Level'
                      name='studyLevelId'
                      onChange={handleChangeSelect}
                      options={studyLevels}
                      defaultValue={formData.studyLevelId ? formData.studyLevelId.toString() : "select"}
                  />
                </div>
        </div>
      )}
      {!disablePassword ? (
      <div>
        <label className="form-label mt-8">Password</label>
        <input
          name="password"
          className="form-input"
          placeholder="********"
          type="password"
          onChange={handleChange}
          value={formData.password}
          required={true}
        />
      </div>
    ) : null}

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

export default SignUpForm;
