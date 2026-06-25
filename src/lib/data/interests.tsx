import Link from "next/link";

import { Interest } from "@/lib/types/item-data";

export const INTERESTS: Interest[] = [
  {
    label: "Reading",
    description:
      "Non-fiction, history, and ideas. Books that change how I think about systems, both technical and human.",
  },
  {
    label: "Running",
    description:
      "Finishing the half-marathon already. I’m still running, mostly because it makes my weeks feel anchored.",
  },
  {
    label: "Travelling",
    description: (
      <>
        From city streets to volcano summits. Every trip is a chance to be lost,
        then found. Documented in the{" "}
        <Link
          href="/atlas"
          className="underline text-foreground hover:opacity-70 transition-opacity"
        >
          atlas
        </Link>
        .
      </>
    ),
  },
];
