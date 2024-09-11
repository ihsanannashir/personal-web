import { ProjectData } from "../../../lib/types/item-data";
import ContainerCard from "../../cards/container-card";
import ProjectCard from "../../cards/project-card";
import StackShowcase from "../../stack-showcase";

const PROJECTS: ProjectData[] = [
  {
    title: "Yomy",
    slug: "yomy",
    description: "A web based SaaS Customer Feedback Manager Application",
    thumbnail: "/defood.png",
    tech: <StackShowcase nextjs tailwind />,
  },
  {
    title: "Fakta 2.0",
    slug: "fakta-com",
    description: "Lorem Ipsum lorem 2",
    thumbnail: "/defood.png",
    tech: <StackShowcase nextjs tailwind expressjs />,
  },
];

const ProjectSection = () => {
  return (
    <ContainerCard
      variant="transparent"
      title="My Projects"
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10"
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
