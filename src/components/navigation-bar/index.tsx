import { BsChatLeftTextFill, BsGithub, BsLinkedin } from "react-icons/bs";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <nav className="fixed z-50 top-4 w-full">
      <div className="sm:max-w-4xl sm:mx-auto">
        <div className="flex justify-between p-4 mx-6 sm:mx-6 bg-white rounded-2xl border">
          {/* Title */}
          <div className="font-semibold">
            <Link href={"/"}>Ihsan An-Nashir's Portfolio</Link>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <Link href={"https://github.com/ihsanannashir"}>
              <BsGithub
                size={22}
                className="hover:-translate-y-1 transition-transform"
              />
            </Link>
            <Link href={"https://linkedin.com/in/ihsanannashir"}>
              <BsLinkedin
                size={22}
                className="hover:-translate-y-1 transition-transform"
              />
            </Link>
            <Link href={"mailto:ihsanannashir@gmail.com"}>
              <BsChatLeftTextFill
                size={22}
                className="hover:-translate-y-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
