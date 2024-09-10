import { ProjectData } from "../../../lib/types/item-data";
import ContainerCard from "../../cards/container-card";
import ProjectCard from "../../cards/project-card";
import StackShowcase from "../../stack-showcase";

const PROJECTS: ProjectData[] = [
  {
    title: "Testing",
    slug: "testing",
    description: "Lorem Ipsum lorem",
    thumbnail: "/defood.png",
    tech: <StackShowcase nextjs tailwind />,
  },
  {
    title: "Testing 2",
    slug: "testing-2",
    description: "Lorem Ipsum lorem 2",
    thumbnail: "/defood.png",
    tech: <StackShowcase nextjs tailwind expressjs />,
  },
  {
    title: "Testing 3",
    slug: "testing-3",
    description: "Lorem Ipsum lorem 3",
    thumbnail: "/defood.png",
    tech: (
      <StackShowcase react nextjs tailwind nodejs expressjs mysql postgresql />
    ),
  },
];

const ProjectSection = () => {
  return (
    <ContainerCard
      variant="transparent"
      title="My Projects"
      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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
