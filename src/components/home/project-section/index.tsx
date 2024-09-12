import { ProjectData } from "../../../lib/types/item-data";
import ContainerCard from "../../cards/container-card";
import ProjectCard from "../../cards/project-card";
import StackShowcase from "../../stack-showcase";

const PROJECTS: ProjectData[] = [
  {
    title: "Yomy",
    slug: "yomy",
    description: "A web based SaaS Customer Feedback Manager Application",
    thumbnail: "/assets/yomy.png",
    tech: <StackShowcase react tailwind />,
  },
  {
    title: "Fakta 2.0",
    slug: "fakta-com",
    description:
      "An Indonesian online media platform that offers news, data, and opinions on a wide range of topics.",
    thumbnail: "/assets/faktacom.png",
    tech: <StackShowcase nextjs tailwind />,
  },
];

const ProjectSection = () => {
  return (
    <ContainerCard
      variant="transparent"
      title="Some of my works"
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10"
      moreUrl="/project"
    >
      {PROJECTS.map((project, index) => {
        return (
          <ProjectCard
            key={`project-card-${index}`}
            title={project.title}
            slug={project.slug}
            description={project.description}
            thumbnail={project.thumbnail}
            tech={project.tech}
          />
        );
      })}
    </ContainerCard>
  );
};

export default ProjectSection;
