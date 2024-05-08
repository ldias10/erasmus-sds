import AuthorCard from "@/components/AuthorCard";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { FormEvent, useState } from "react";
import { Author } from "@/types";

const Authors = () => {
  const authorIndex: Author = getListPage("courses/_index.md");
  const authors: Author[] = getSinglePage("courses");
  const { title, meta_title, description, image } = authorIndex.frontmatter;

  // const [loading, setLoading] = useState(false);
  // const getCourses = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);

  //     const response = await fetch("/api/course", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     });

  //     const responseData = await response.json();
  //     console.log(responseData);
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section-sm pb-0">
        <div className="container">
          <div className="row justify-center">
            {authors.map((author: Author, index: number) => (
              <div className="mb-14 md:col-6 lg:col-4" key={index}>
                <AuthorCard data={author} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Authors;
