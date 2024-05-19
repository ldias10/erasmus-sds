"use client";
import { useEffect, useState } from 'react';
import config from "@/config/config.json";
import PageHeader from "@/partials/PageHeader";
import Comments from "@/partials/Comments";

const Contact = () => {
  const { contact_form_action } = config.params;
  const [id, setId] = useState<string>('');
  useEffect(() => {
    // Function to extract id from URL
    const getIdFromURL = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const idParam = queryParams.get('id');
      if (idParam) {
        setId(idParam);
      }
    };

    getIdFromURL(); });
  return (
    <>
      <PageHeader />
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <form action={contact_form_action} method="POST">
                <div className="mb-6">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Working Mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="joh.doe@email.com"
                    type="email"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="form-label">
                    Anything else? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input"
                    placeholder="Message goes here..."
                    rows={8}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Comments id = {id} />

    </>
  );
};

export default Contact;
