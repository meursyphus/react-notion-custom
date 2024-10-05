export default function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">react-notion-custom Docs</h1>
    </div>
  );
}
