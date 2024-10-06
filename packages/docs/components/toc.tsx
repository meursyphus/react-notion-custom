interface TOCItem {
  id: string;
  title: string;
}

interface TOCProps {
  items: TOCItem[];
}

export default function TOC({ items }: TOCProps) {
  return (
    <nav className="w-60 px-4 sticky top-10 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`text-sm hover:font-bold dark:text-gray-500 dark:hover:text-white`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
