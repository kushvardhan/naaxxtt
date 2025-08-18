import { Metadata } from "next";

export const siteConfig = {
  name: "NullFlow",
  description: "A modern, feature-rich Q&A platform for developers. Ask questions, share knowledge, and build your coding career with our vibrant community.",
  url: "https://nullflow.vercel.app",
  ogImage: "https://nullflow.vercel.app/og-image.png",
  developer: {
    name: "Kush Vardhan",
    email: "kushvardhan39797@gmail.com",
    github: "https://github.com/kushvardhan",
    linkedin: "https://linkedin.com/in/kushvardhan"
  },
  keywords: [
    "developer Q&A",
    "programming questions",
    "coding community",
    "tech support",
    "software development",
    "programming help",
    "developer forum",
    "coding answers",
    "tech questions",
    "programming community",
    "developer platform",
    "coding solutions",
    "software engineering",
    "web development",
    "mobile development",
    "full stack development",
    "frontend development",
    "backend development",
    "DevOps",
    "machine learning",
    "data science",
    "artificial intelligence",
    "blockchain",
    "cloud computing",
    "cybersecurity"
  ]
};

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  keywords = [],
  author,
  publishedTime,
  modifiedTime
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: allKeywords.join(", "),
    authors: [
      { name: siteConfig.developer.name, url: siteConfig.developer.github },
      ...(author ? [{ name: author }] : [])
    ],
    creator: siteConfig.developer.name,
    publisher: siteConfig.developer.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_US",
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [author || siteConfig.developer.name],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: `@${siteConfig.developer.name.replace(" ", "").toLowerCase()}`,
    },
    alternates: {
      canonical: metaUrl,
    },
    other: {
      "application-name": siteConfig.name,
      "apple-mobile-web-app-title": siteConfig.name,
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "format-detection": "telephone=no",
      "mobile-web-app-capable": "yes",
      "msapplication-config": "/browserconfig.xml",
      "msapplication-TileColor": "#ea580c",
      "msapplication-tap-highlight": "no",
      "theme-color": "#ea580c",
    },
  };
}

export const structuredData = {
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    author: {
      "@type": "Person",
      name: siteConfig.developer.name,
      email: siteConfig.developer.email,
      url: siteConfig.developer.github,
    },
  },
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.svg`,
    founder: {
      "@type": "Person",
      name: siteConfig.developer.name,
      email: siteConfig.developer.email,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.developer.email,
      contactType: "Developer Support",
    },
  },
  qaPage: (question: any) => ({
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: question.title,
      text: question.explanation,
      answerCount: question.answers?.length || 0,
      upvoteCount: question.upvotes?.length || 0,
      dateCreated: question.createdAt,
      author: {
        "@type": "Person",
        name: question.author?.name || "Anonymous",
      },
      acceptedAnswer: question.answers?.[0] ? {
        "@type": "Answer",
        text: question.answers[0].content,
        upvoteCount: question.answers[0].upvotes?.length || 0,
        dateCreated: question.answers[0].createdAt,
        author: {
          "@type": "Person",
          name: question.answers[0].author?.name || "Anonymous",
        },
      } : undefined,
    },
  }),
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }),
};

export function generateJsonLd(data: any) {
  return {
    __html: JSON.stringify(data),
  };
}
