export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Smart GPT",
  description:
    "Chat with any pdf file, powered by Langchain, Pinecone, Supabase and OpenAI",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Documents",
      href: "/documents",
    },
    {
      title: "Credentials",
      href: "/credentials",
    },
    {
      title: "",
      href: "",
    },
  ],
  links: {
    twitter: "",
    github: "",
  },
}
