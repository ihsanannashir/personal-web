import { Metadata } from "next";
import { StaticImageData } from "next/image";

type ConstructMetadataOptions = {
  title: string;
  description: string;
  keywords?: string;
  slug?: string;
  ogImage?: StaticImageData;
};

const BASE_URL = "https://ihsanannashir.dev";
const SITE_NAME = "Ihsan An-Nashir's Portfolio";

export function constructMetadata({
  title,
  description,
  keywords,
  slug = "",
  ogImage,
}: ConstructMetadataOptions): Metadata {
  const url = `${BASE_URL}${slug}`;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    openGraph: {
      title,
      description,
      siteName: `${title} - ${SITE_NAME}`,
      type: "website",
      url,
      ...(ogImage && {
        images: [
          {
            url: ogImage.src,
            width: ogImage.width,
            height: ogImage.height,
          },
        ],
      }),
    },
  };
}
