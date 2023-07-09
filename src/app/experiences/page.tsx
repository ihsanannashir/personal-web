import React from "react";
import { Metadata } from "next";

import PageLayout from "../../components/PageLayout";

export const metadata: Metadata = {
  title: "Experiences",
};

function Experiences() {
  return (
    <PageLayout>
      <h1>Ini Experiences</h1>
    </PageLayout>
  );
}

export default Experiences;
