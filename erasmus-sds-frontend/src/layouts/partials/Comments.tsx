"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Comment {
  id: number;
  content: string;
  date: string;
  studentUserId: number;
  courseId: number
}

interface FormData {
  content: string;
  date: string;
  studentUserId : number; 
  courseId : number;
}


const Comments = ({ id }: { id: any }) => {
  const [comments, setComments] = useState<any[]>([]);
  const role = sessionStorage.getItem("userState");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    content: "",
    studentUserId: 7,
    date: "",
    courseId: 6,
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/comments?courseId=${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
    
        const comments = await response.json();
        console.log("The comments are: ", comments);
        if (comments.length ===1) {
          comments.push(comments[0])
          comments.push(comments[0])
        }
        if (comments.length ===2) {
          comments.push(comments[0])
          comments.push(comments[1])
        }
        setComments(comments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      fetchComments();
    },[]
  );

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  //  const getStudentName = async (item: Comment): Promise<any> => {
  //   const response = await fetch(`http://localhost:8080/student/${item.studentUserId}`, {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json'
  //         }
  //       });
  //   const studentName = await response.json();
  //   return studentName;
  // }

  const handleComment = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    const data = new Date();
    formData.date = data.toISOString();
    console.log(formData);
    console.log(data.toDateString())
    console.log(sessionStorage.getItem("userData"));
    console.log("trying to comment");
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);

    try {
      console.log(formData)
      const response = await fetch("http://localhost:8080/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
       
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessages(["An unexpected error occurred."]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {<section className="section">
        {role === 'student' && 
        <div className="container">
            <div className="row">
              <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-6">
              {/* <div> 
                <h2>Rate this course</h2> 
                <ReactStars 
                  count={5} 
                  size={24} 
                  color2={'#ffd700'} /> 
              </div>  */}
                <h3
                  dangerouslySetInnerHTML={markdownify("Write here your comment")}
                  className="mb-4"
                />
              </div>
                
            </div>
            <form onSubmit={handleComment}>
              <input
                  className="form-input"
                  placeholder="Write here your comment ..."
                  type="text"
                  name="comment"
                  onChange={handleChange}
                />
                <br></br>
              <button type="submit" className="btn3 btn-primary">Submit</button>
            </form>
          </div>}
              <br></br><br></br>
          <div className="container">
            <div className="row">
              <div className="mx-auto mb-12 text-center md:col-10 lg:col-8 xl:col-6">
                <h2
                  dangerouslySetInnerHTML={markdownify("Comments")}
                  className="mb-4"
                />
              </div>
              <div className="col-12">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  loop={true}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={24}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {comments.length > 0  && comments.map(
                    (item: Comment, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="rounded-lg bg-theme-light px-7 py-10 dark:bg-darkmode-theme-light">
                          <div className="text-dark dark:text-white">
                            <svg
                              width="33"
                              height="20"
                              viewBox="0 0 33 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.28375 19.41L0.79375 18.64C1.21375 17.0067 1.75042 15.07 2.40375 12.83C3.05708 10.5433 3.75708 8.28 4.50375 6.04C5.29708 3.75333 6.06708 1.77 6.81375 0.0899959H15.3538C14.9338 2.09666 14.4904 4.26667 14.0238 6.6C13.5571 8.88666 13.1371 11.15 12.7638 13.39C12.4371 15.5833 12.1571 17.59 11.9238 19.41H1.28375ZM31.69 0.0899959L32.18 0.859998C31.76 2.54 31.2233 4.5 30.57 6.74C29.9167 8.98 29.2167 11.2433 28.47 13.53C27.7233 15.77 26.9533 17.73 26.16 19.41H17.69C18.0167 17.9167 18.3433 16.33 18.67 14.65C18.9967 12.9233 19.3 11.22 19.58 9.54C19.9067 7.81333 20.1867 6.15667 20.42 4.57C20.7 2.93666 20.91 1.44333 21.05 0.0899959H31.69Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <blockquote
                            className="mt-8"
                            dangerouslySetInnerHTML={markdownify(item.content)}
                          />
                          <div className="mt-11 flex items-center">
                            <div className="text-dark dark:text-white">
                              <ImageFallback
                                height={50}
                                width={50}
                                className="rounded-full"
                                src="/images/avatar-sm.png"
                                alt= "avatar"
                              />
                            </div>
                            
                            {/* <div className="ml-4">
                              <h3
                                dangerouslySetInnerHTML={markdownify(item.name)}
                                className="h5 font-primary font-semibold"
                              />
                              <p
                                dangerouslySetInnerHTML={markdownify(
                                  item.designation,
                                )}
                                className="text-dark dark:text-white"
                              />
                            </div> */}
                          </div>
                          {/* {getStudentName(item)} */}
                        </div>
                      </SwiperSlide>
                    ),
                  )}
                  {comments.length == 0 && <div className="form-label" style={{textAlign: 'center'}}>There are no comments for this course.</div>}
                </Swiper>
              </div>
            </div>
          </div>
          
        </section>
      }
    </>
  );
};

export default Comments;
