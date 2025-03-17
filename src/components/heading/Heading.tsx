export default function Heading({
  name,
  desc,
}: {
  name: string;
  desc?: string;
}) {
  return (
    <div className="flex w-full relative mt-6 mb-6 flex-col">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-12 bg-blue-600 mt-1"></span>
        <h1 className="text-xl font-bold capitalize border-b border-b-gray-300 pb-2 ">
          {name}
        </h1>
      </div>
      {desc && <p className="text-gray-500 text-sm mt-2">{desc}</p>}
    </div>
  );
}
