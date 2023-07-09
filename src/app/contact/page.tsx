import React from "react";
import { Metadata } from "next";

import PageLayout from "../../components/PageLayout";

export const metadata: Metadata = {
  title: "Contact",
};

function ContactPage() {
  return (
    <PageLayout>
      <h1>Contact Me!</h1>
    </PageLayout>
  );
}

export default ContactPage;
