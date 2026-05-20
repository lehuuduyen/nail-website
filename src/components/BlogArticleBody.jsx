export default function BlogArticleBody({ content }) {
  if (!content) return null;

  return (
    <div
      className="blog-content mt-8"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
