import React from "react";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai";

function Footer() {
  const iconTheme: string =
    "hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500";

  return (
    <footer className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
      <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0" />
      <div className="mx-auto p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between">
        <div className="text-neutral-500 ">&#169; 2023 Ihsan An-Nashir</div>
        <div className="flex flex-row items-center justify-center space-x-2 mt-2 md:mt-0 mb-1">
          <a
            href="https://github.com/ihsanannashir"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineGithub
              className={iconTheme + " hover:text-[#0d1117]"}
              size={30}
            />
          </a>
          <a
            href="https://linkedin.com/in/ihsanannashir"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              className={iconTheme + " hover:text-[#0077b5]"}
              size={30}
            />
          </a>
          <a
            href="mailto:ihsanannashir@gmail.com"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineMail
              className={iconTheme + " hover:text-red-500"}
              size={30}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
