export default function Searchbar() {
  return (
    <div className="p-4 bg-white bg-opacity-80 backdrop-blur-md bg-white/30 rounded-md shadow-md col-span-2">
      <input
        type="text"
        className="focus:outline-none bg-transparent px-2 text-white w-full font-semibold text-lg"
      />
    </div>
  );
}
