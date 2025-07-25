import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchBar = () => {
  return (
    <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg bg-[#3C3C3C] px-3.5 py-2 h-12">
      <MagnifyingGlassIcon className="h-6 w-6 text-white opacity-50" />
      <Input type="search" className="w-full border-0 focus-visible:ring-0 outline-none h-8 text-white placeholder:text-[1rem]" />
    </div>
  );
}

export { SearchBar }
