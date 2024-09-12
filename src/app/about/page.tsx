import TitleCard from "../../components/cards/title-card";

const AboutPage = () => {
  return (
    <div>
      <TitleCard title="About Me" />
      <div className="my-4 text-justify space-y-4">
        <p>
          Hi there! I am Ihsan, a highly ambitious web developer based in
          Indonesia. I graduated from Brawijaya University, Malang in early 2023
          with a bachelor degree in Computer Engineering and have prior
          experiences working as a web developer in several companies.
        </p>
        <p>
          Experienced in Web Development, I have developed software with various
          technologies like Javascript/Typescript, Java, and frameworks like
          NextJS and Spring Boot. My expertise spans in frontend development,
          especially React. I'm open to explore many new stacks in order to
          learn and keep myself updated within the industries.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
