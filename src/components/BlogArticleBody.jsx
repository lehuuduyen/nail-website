import Link from 'next/link';

function RichParagraph({ text }) {
  const re = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;
  const nodes = [];
  let last = 0;
  let m;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(text.slice(last, m.index));
    }
    nodes.push(
      <Link
        key={key++}
        href={m[2]}
        className="font-medium text-rose-gold underline decoration-rose-gold/40 underline-offset-2"
      >
        {m[1]}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes.length ? nodes : text;
}

export default function BlogArticleBody({ content }) {
  const parts = String(content || '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="mt-8">
      {parts.map((para, i) => (
        <p
          key={i}
          className="mb-4 text-base leading-relaxed text-charcoal/85 last:mb-0 md:text-lg"
        >
          <RichParagraph text={para} />
        </p>
      ))}
    </div>
  );
}
