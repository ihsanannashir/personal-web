import React from "react";
import { Metadata } from "next";

import PageLayout from "../../components/PageLayout";

export const metadata: Metadata = {
  title: "Projects",
};

function Projects() {
  return (
    <PageLayout>
      <h1>ini Project</h1>
    </PageLayout>
  );
}

export default Projects;
