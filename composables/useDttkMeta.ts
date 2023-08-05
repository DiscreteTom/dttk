export const useDttkMeta = (options: {
  title: string;
  description: string;
  path: string;
}) => {
  const title = `${options.title} · DTTK`;
  const description = `${options.description} Works offline with PWA.`;

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
    link: [
      {
        rel: "canonical",
        href: `https://dttk.discretetom.com${options.path}`,
      },
    ],
  });
  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
  });
};
