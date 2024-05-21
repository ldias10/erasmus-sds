import { plainify } from "@/lib/utils/textConverter";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Course } from "@/app/courses/page";
import { IoIosMore } from "react-icons/io";

const CourseCard = ({ data }: { data: Course }) => {
  const { name } = data;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative rounded bg-theme-light p-8 text-center dark:bg-darkmode-theme-light">
      <div className="relative">
        <h4 className="mb-3">
          <Link href={`/courses/${data.id}`}>{name}</Link>
        </h4>
        <div className="absolute top-0 right-0 mt-2 mr-2" ref={menuRef}>
          <button onClick={handleMenuToggle} className="focus:outline-none">
            <IoIosMore className="text-xl" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1">
                <Link
                    href={`/courses/edit/${data.id}`}
                      >
                  <li>

                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                      onClick={() => console.log('Edit clicked')}
                    >
                      Edit
                    </button>
                  </li>
                </Link>
                {/* <li>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    onClick={() => console.log('Delete clicked')}
                  >
                    Delete
                  </button>
                </li> */}
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="mb-4">{plainify(data.description.slice(0, 100))}</p>
    </div>
  );
};
export default CourseCard;
