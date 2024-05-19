import { plainify } from "@/lib/utils/textConverter";
import Link from "next/link";

const CourseCard = ({ data }: { data: any }) => {
  const { name } = data;
  return (
    <div className="rounded bg-theme-light p-8 text-center dark:bg-darkmode-theme-light">
      <h4 className="mb-3">
        <Link href={`/contact?id=${data.id}`}>{name}</Link>
      </h4>
      <p className="mb-4">{plainify(data.description.slice(0, 100))}</p>
    </div>
  );
};

export default CourseCard;
