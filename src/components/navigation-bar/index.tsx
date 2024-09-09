import { BsChatLeftTextFill, BsGithub, BsLinkedin } from "react-icons/bs";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <nav className="fixed z-50 top-4 w-full sm:max-w-4xl">
      <div className="flex justify-between p-4 mr-12 bg-white rounded-lg border">
        <div>Home</div>
        <div className="flex space-x-4">
          <Link href={"https://github.com/ihsanannashir"}>
            <BsGithub size={22} />
          </Link>
          <Link href={"https://linkedin.com/in/ihsanannashir"}>
            <BsLinkedin size={22} />
          </Link>
          <Link href={"mailto:ihsanannashir@gmail.com"}>
            <BsChatLeftTextFill size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
