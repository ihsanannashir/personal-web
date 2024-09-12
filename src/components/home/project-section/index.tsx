import { PROJECTS } from "../../../lib/data/projects";
import ContainerCard from "../../cards/container-card";
import ProjectCard from "../../cards/project-card";

const ProjectSection = () => {
  return (
    <ContainerCard
      variant="transparent"
      title="My Projects"
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10"
      moreUrl="/project"
    >
      {PROJECTS.map((project, index) => {
        if (index < 2) {
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
        }
      })}
    </ContainerCard>
  );
};

export default ProjectSection;
