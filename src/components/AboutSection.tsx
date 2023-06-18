import React from "react";

//skills will be updated regularly (hopefully hehehe)
const skills = [
  { skill: "HTML" },
  { skill: "CSS" },
  { skill: "Javascript" },
  { skill: "Typescript" },
  { skill: "Python" },
  { skill: "ReactJS" },
  { skill: "NextJS" },
  { skill: "TailwindCSS" },
  { skill: "Bootstrap" },
  { skill: "Chakra UI" },
  { skill: "Flutter" },
];

function AboutSection() {
  return (
    <section id="about">
      <div className="my-12 pb-12 md:pt-16 md:pb-48">
        <h1 className="text-center font-bold text-4xl">
          About Me
          <hr className="w-6 h-1 mx-auto my-4 bg-blue-600 border-0 rounded" />
        </h1>
        <div className="flex flex-col space-y-10 items-stretch justify-center align-top md:flex-row md:text-left md:p-4 md:space-y-0 md:space-x-10">
          <div className="md:w-1/2">
            <h1 className="text-center font-bold text-2xl mb-6 md:text-left">
              More about me
            </h1>
            <div className="text-lg">
              <p>
                Hi again! I am{" "}
                <span className="text-blue-600 font-semibold">Ihsan</span>, a{" "}
                <span className="text-blue-600">highly ambitious</span> and{" "}
                <span className="text-blue-600">aspiring</span> frontend
                developer based in Indonesia.
              </p>
              <br />
              <p>
                I graduated from Brawijaya University, Malang in early 2023 with
                a bachelor degree in Computer Engineering and have{" "}
                <span className="text-blue-600">prior experiences</span> working
                as a frontend engineer intern in several companies.
              </p>
              <br />
              <p>
                Currently focusing on frontend web development mainly using
                ReactJS, i am{" "}
                <span className="text-blue-600">open to the possibility</span>{" "}
                of doing backend and other tech stacks.
              </p>
              <br />
              <p>
                I love learning and discovering with many things, and currently
                seeking for opportunities to{" "}
                <span className="text-blue-600">grow and learn</span>.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-center text-2xl font-bold mb-6 md:text-left">
              My Skills
            </h1>
            <div className="flex flex-wrap flex-row justify-center md:justify-start">
              {skills.map((item, index) => {
                return (
                  <p
                    key={index}
                    className="bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold hover:scale-110 ease-in-out duration-300 cursor-default"
                  >
                    {item.skill}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
