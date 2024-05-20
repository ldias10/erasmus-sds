import { plainify } from "@/lib/utils/textConverter";
import Link from "next/link";
import { Course } from "@/app/courses/page";
const CourseCard = ({ data }: { data: Course }) => {
  const { name } = data;
  return (
    <div className="rounded bg-theme-light p-8 text-center dark:bg-darkmode-theme-light">
      <h4 className="mb-3">
      <Link href={`/courses/${data.id}`}>{name}</Link>
      </h4>
      <p className="mb-4">{plainify(data.description.slice(0, 100))}</p>
    </div>
  );
};

export default CourseCard;
