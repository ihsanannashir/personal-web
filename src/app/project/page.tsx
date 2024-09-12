import ProjectCard from "../../components/cards/project-card";
import TitleCard from "../../components/cards/title-card";
import { PROJECTS } from "../../lib/data/projects";

const ProjectPage = () => {
  return (
    <div className="space-y-8">
      {/* Title */}
      <TitleCard
        title="Projects"
        description="Projects that has been done by me individually and as a team."
      />

      {/* Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
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
      </div>
    </div>
  );
};

export default ProjectPage;
