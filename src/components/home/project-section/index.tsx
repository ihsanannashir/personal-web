import { PROJECTS } from "@/lib/data/projects";
import ContainerCard from "@/components/cards/container-card";
import ProjectCard from "@/components/cards/project-card";

const ProjectSection = () => {
  return (
    <section id="projects">
      <ContainerCard
        variant="transparent"
        title="Projects"
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard
            className="animate-fade-in"
            key={`project-card-${index}`}
            title={project.title}
            slug={project.slug}
            description={project.description}
            thumbnail={project.thumbnail}
            tech={project.tech}
          />
        ))}
      </ContainerCard>
    </section>
  );
};

export default ProjectSection;
