import Link from "next/link";
import { ProjectData } from "../../../lib/types/item-data";
import Image from "next/image";

const ProjectCard = ({
  title,
  slug,
  description,
  thumbnail,
  tech,
}: ProjectData) => {
  return (
    <Link href={`/project/${slug}`}>
      <div className="hover:scale-105 p-0 bg-white rounded-lg border sm:min-h-[365px] drop-shadow-[4px_4px_0px_rgba(118,116,250,0.75)] transition-all duration-200">
        {/* Thumbnail */}
        {thumbnail && (
          <Image
            alt={title}
            src={thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-52 rounded-t-lg object-cover border-b"
          />
        )}

        <div className="p-4 space-y-6">
          {/* Title and Description */}
          <div className="space-y-2">
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm">{description}</p>
          </div>

          {/* Tech Stack */}
          {tech && tech}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
