"use client";

// import { CustomerError } from "@/lib/shopify/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

import SelectInput from '../SelectInput';

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

const StudentSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    surname: "",
    name: "",
    email: "",
    isVerified: false,
    countryId: 0,
    schoolId: 0,
    studyLevelId: 0,
    password: "",
    
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8080/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("The Response is---------------------------:",response
        ,"And response.ok is: ",response.ok
      );

      if (response.ok) {
        setErrorMessages([]);
        const data = responseData;
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
      } else {
        const errors = responseData.errors || [];
        setErrorMessages(errors);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-11 sm:col-9 md:col-7 mx-auto">
              <div className="mb-14 text-center">
                <h2 className="max-md:h1 md:mb-2">Create an account</h2>
                <p className="md:text-lg">
                  Create an account and start using...
                </p>
              </div>

              <form onSubmit={handleSignUp}>
                <div>
                  <label className="form-label">Name</label>
                  <input
                    name="firstName"
                    className="form-input"
                    placeholder="Enter your first name"
                    type="text"
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-2">
                  <input
                    name="lastName"
                    className="form-input"
                    placeholder="Enter your last name"
                    type="text"
                    onChange={handleChange}
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
                  />
                </div>

                <div>
                  <label className="form-label mt-8">Country</label>
                  <select className='form-input' 
                          name='countryId'
                          onChange={handleChangeSelect}>
                    <option value="">-- select one --</option>
                    <option value="004">Afghanistan</option>
                    <option value="008">Albania</option>
                    <option value="012">Algeria</option>
                    <option value="016">American Samoa</option>
                    <option value="020">Andorra</option>
                    <option value="024">Angola</option>
                    <option value="660">Anguilla</option>
                    <option value="010">Antarctica</option>
                    <option value="028">Antigua and Barbuda</option>
                    <option value="032">Argentina</option>
                    <option value="051">Armenia</option>
                    <option value="533">Aruba</option>
                    <option value="036">Australia</option>
                    <option value="040">Austria</option>
                    <option value="031">Azerbaijan</option>
                    <option value="044">Bahamas (the)</option>
                    <option value="048">Bahrain</option>
                    <option value="050">Bangladesh</option>
                    <option value="052">Barbados</option>
                    <option value="112">Belarus</option>
                    <option value="056">Belgium</option>
                    <option value="084">Belize</option>
                    <option value="204">Benin</option>
                    <option value="060">Bermuda</option>
                    <option value="064">Bhutan</option>
                    <option value="068">Bolivia (Plurinational State of)</option>
                    <option value="535">Bonaire, Sint Eustatius and Saba</option>
                    <option value="070">Bosnia and Herzegovina</option>
                    <option value="072">Botswana</option>
                    <option value="074">Bouvet Island</option>
                    <option value="076">Brazil</option>
                    <option value="086">British Indian Ocean Territory (the)</option>
                    <option value="096">Brunei Darussalam</option>
                    <option value="100">Bulgaria</option>
                    <option value="854">Burkina Faso</option>
                    <option value="108">Burundi</option>
                    <option value="132">Cabo Verde</option>
                    <option value="116">Cambodia</option>
                    <option value="120">Cameroon</option>
                    <option value="124">Canada</option>
                    <option value="136">Cayman Islands (the)</option>
                    <option value="140">Central African Republic (the)</option>
                    <option value="148">Chad</option>
                    <option value="152">Chile</option>
                    <option value="156">China</option>
                    <option value="162">Christmas Island</option>
                    <option value="166">Cocos (Keeling) Islands (the)</option>
                    <option value="170">Colombia</option>
                    <option value="174">Comoros (the)</option>
                    <option value="180">Congo (the Democratic Republic of the)</option>
                    <option value="178">Congo (the)</option>
                    <option value="184">Cook Islands (the)</option>
                    <option value="188">Costa Rica</option>
                    <option value="191">Croatia</option>
                    <option value="192">Cuba</option>
                    <option value="531">Curaçao</option>
                    <option value="196">Cyprus</option>
                    <option value="203">Czechia</option>
                    <option value="384">Côte d'Ivoire</option>
                    <option value="208">Denmark</option>
                    <option value="262">Djibouti</option>
                    <option value="212">Dominica</option>
                    <option value="214">Dominican Republic (the)</option>
                    <option value="218">Ecuador</option>
                    <option value="818">Egypt</option>
                    <option value="222">El Salvador</option>
                    <option value="226">Equatorial Guinea</option>
                    <option value="232">Eritrea</option>
                    <option value="233">Estonia</option>
                    <option value="748">Eswatini</option>
                    <option value="231">Ethiopia</option>
                    <option value="238">Falkland Islands (the) [Malvinas]</option>
                    <option value="234">Faroe Islands (the)</option>
                    <option value="242">Fiji</option>
                    <option value="246">Finland</option>
                    <option value="250">France</option>
                    <option value="254">French Guiana</option>
                    <option value="258">French Polynesia</option>
                    <option value="260">French Southern Territories (the)</option>
                    <option value="266">Gabon</option>
                    <option value="270">Gambia (the)</option>
                    <option value="268">Georgia</option>
                    <option value="276">Germany</option>
                    <option value="288">Ghana</option>
                    <option value="292">Gibraltar</option>
                    <option value="300">Greece</option>
                    <option value="304">Greenland</option>
                    <option value="308">Grenada</option>
                    <option value="312">Guadeloupe</option>
                    <option value="316">Guam</option>
                    <option value="831">Guernsey</option>
                    <option value="324">Guinea</option>
                    <option value="624">Guinea-Bissau</option>
                    <option value="328">Guyana</option>
                    <option value="332">Haiti</option>
                    <option value="334">Heard Island and McDonald Islands</option>
                    <option value="336">Holy See (the)</option>
                    <option value="340">Honduras</option>
                    <option value="344">Hong Kong</option>
                    <option value="348">Hungary</option>
                    <option value="352">Iceland</option>
                    <option value="356">India</option>
                    <option value="360">Indonesia</option>
                    <option value="364">Iran (Islamic Republic of)</option>
                    <option value="368">Iraq</option>
                    <option value="372">Ireland</option>
                    <option value="833">Isle of Man</option>
                    <option value="376">Israel</option>
                    <option value="380">Italy</option>
                    <option value="388">Jamaica</option>
                    <option value="392">Japan</option>
                    <option value="832">Jersey</option>
                    <option value="400">Jordan</option>
                    <option value="398">Kazakhstan</option>
                    <option value="404">Kenya</option>
                    <option value="296">Kiribati</option>
                    <option value="408">Korea (the Democratic People's Republic of)</option>
                    <option value="410">Korea (the Republic of)</option>
                    <option value="414">Kuwait</option>
                    <option value="417">Kyrgyzstan</option>
                    <option value="418">Lao People's Democratic Republic (the)</option>
                    <option value="428">Latvia</option>
                    <option value="422">Lebanon</option>
                    <option value="426">Lesotho</option>
                    <option value="430">Liberia</option>
                    <option value="434">Libya</option>
                    <option value="438">Liechtenstein</option>
                    <option value="440">Lithuania</option>
                    <option value="442">Luxembourg</option>
                    <option value="446">Macao</option>
                    <option value="450">Madagascar</option>
                    <option value="454">Malawi</option>
                    <option value="458">Malaysia</option>
                    <option value="462">Maldives</option>
                    <option value="466">Mali</option>
                    <option value="470">Malta</option>
                    <option value="584">Marshall Islands (the)</option>
                    <option value="474">Martinique</option>
                    <option value="478">Mauritania</option>
                    <option value="480">Mauritius</option>
                    <option value="175">Mayotte</option>
                    <option value="484">Mexico</option>
                    <option value="583">Micronesia (Federated States of)</option>
                    <option value="498">Moldova (the Republic of)</option>
                    <option value="492">Monaco</option>
                    <option value="496">Mongolia</option>
                    <option value="499">Montenegro</option>
                    <option value="500">Montserrat</option>
                    <option value="504">Morocco</option>
                    <option value="508">Mozambique</option>
                    <option value="104">Myanmar</option>
                    <option value="516">Namibia</option>
                    <option value="520">Nauru</option>
                    <option value="524">Nepal</option>
                    <option value="528">Netherlands (the)</option>
                    <option value="540">New Caledonia</option>
                    <option value="554">New Zealand</option>
                    <option value="558">Nicaragua</option>
                    <option value="562">Niger (the)</option>
                    <option value="566">Nigeria</option>
                    <option value="570">Niue</option>
                    <option value="574">Norfolk Island</option>
                    <option value="580">Northern Mariana Islands (the)</option>
                    <option value="578">Norway</option>
                    <option value="512">Oman</option>
                    <option value="586">Pakistan</option>
                    <option value="585">Palau</option>
                    <option value="275">Palestine, State of</option>
                    <option value="591">Panama</option>
                    <option value="598">Papua New Guinea</option>
                    <option value="600">Paraguay</option>
                    <option value="604">Peru</option>
                    <option value="608">Philippines (the)</option>
                    <option value="612">Pitcairn</option>
                    <option value="616">Poland</option>
                    <option value="620">Portugal</option>
                    <option value="630">Puerto Rico</option>
                    <option value="634">Qatar</option>
                    <option value="807">Republic of North Macedonia</option>
                    <option value="642">Romania</option>
                    <option value="643">Russian Federation (the)</option>
                    <option value="646">Rwanda</option>
                    <option value="638">Réunion</option>
                    <option value="652">Saint Barthélemy</option>
                    <option value="654">Saint Helena, Ascension and Tristan da Cunha</option>
                    <option value="659">Saint Kitts and Nevis</option>
                    <option value="662">Saint Lucia</option>
                    <option value="663">Saint Martin (French part)</option>
                    <option value="666">Saint Pierre and Miquelon</option>
                    <option value="670">Saint Vincent and the Grenadines</option>
                    <option value="882">Samoa</option>
                    <option value="674">San Marino</option>
                    <option value="678">Sao Tome and Principe</option>
                    <option value="682">Saudi Arabia</option>
                    <option value="686">Senegal</option>
                    <option value="688">Serbia</option>
                    <option value="690">Seychelles</option>
                    <option value="694">Sierra Leone</option>
                    <option value="702">Singapore</option>
                    <option value="534">Sint Maarten (Dutch part)</option>
                    <option value="703">Slovakia</option>
                    <option value="705">Slovenia</option>
                    <option value="090">Solomon Islands</option>
                    <option value="706">Somalia</option>
                    <option value="710">South Africa</option>
                    <option value="239">South Georgia and the South Sandwich Islands</option>
                    <option value="728">South Sudan</option>
                    <option value="724">Spain</option>
                    <option value="144">Sri Lanka</option>
                    <option value="729">Sudan (the)</option>
                    <option value="740">Suriname</option>
                    <option value="744">Svalbard and Jan Mayen</option>
                    <option value="752">Sweden</option>
                    <option value="756">Switzerland</option>
                    <option value="760">Syrian Arab Republic</option>
                    <option value="158">Taiwan (Province of China)</option>
                    <option value="762">Tajikistan</option>
                    <option value="834">Tanzania, United Republic of</option>
                    <option value="764">Thailand</option>
                    <option value="626">Timor-Leste</option>
                    <option value="768">Togo</option>
                    <option value="772">Tokelau</option>
                    <option value="776">Tonga</option>
                    <option value="780">Trinidad and Tobago</option>
                    <option value="788">Tunisia</option>
                    <option value="792">Turkey</option>
                    <option value="795">Turkmenistan</option>
                    <option value="796">Turks and Caicos Islands (the)</option>
                    <option value="798">Tuvalu</option>
                    <option value="800">Uganda</option>
                    <option value="804">Ukraine</option>
                    <option value="784">United Arab Emirates (the)</option>
                    <option value="826">United Kingdom of Great Britain and Northern Ireland (the)</option>
                    <option value="581">United States Minor Outlying Islands (the)</option>
                    <option value="840">United States of America (the)</option>
                    <option value="858">Uruguay</option>
                    <option value="860">Uzbekistan</option>
                    <option value="548">Vanuatu</option>
                    <option value="862">Venezuela (Bolivarian Republic of)</option>
                    <option value="704">Viet Nam</option>
                    <option value="092">Virgin Islands (British)</option>
                    <option value="850">Virgin Islands (U.S.)</option>
                    <option value="876">Wallis and Futuna</option>
                    <option value="732">Western Sahara</option>
                    <option value="887">Yemen</option>
                    <option value="894">Zambia</option>
                    <option value="716">Zimbabwe</option>
                    <option value="248">Åland Islands</option>
                  </select>
                </div>
                <div>
                  <label className="form-label mt-8">School</label>
                  <select className='form-input' 
                          name='schoolId'
                          onChange={handleChangeSelect}>
                    <option value="">-- select one --</option>
                    <option value="1">IMT Atlantique</option>
                    <option value="2">Poznań</option>
                  </select>
                </div>
                <div>
                  <SelectInput
                      name='studyLevelId'
                      onChange={handleChangeSelect}
                      options={{
                        "1": "Primary education",
                        "2": "Secondary education or high school",
                        "3": "Bachelor's degree",
                        "4": "Master's degree",
                        "5": "Doctorate or higher",
                      }}
                  />
                </div>
                <div>
                  <label className="form-label mt-8">Password</label>
                  <input
                    name="password"
                    className="form-input"
                    placeholder="********"
                    type="password"
                    onChange={handleChange}
                  />
                </div>

                {/* {errorMessages.map((error: CustomerError) => (
                  <p
                    key={error.code}
                    className="ont-medium text-red-500 truncate mt-2"
                  >
                    *{error.message}
                  </p>
                ))} */}

                <button
                  type="submit"
                  className="btn btn-primary md:text-lg md:font-medium w-full mt-10"
                >
                  {loading ? (
                    <BiLoaderAlt className={`animate-spin mx-auto`} size={26} />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              <div className="flex gap-x-2 text-sm md:text-base mt-6">
                <p className="text-light dark:text-darkmode-light">
                  I have read and agree to the
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/terms-services"}
                >
                  Terms & Conditions
                </Link>
              </div>

              <div className="flex gap-x-2 text-sm md:text-base mt-2">
                <p className="text-light dark:text-darkmode-light">
                  Have an account?
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/login"}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentSignUp;
