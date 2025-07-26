import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelect = ({ value, onChange, placeholder, optional, options }) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val === "any" ? "" : val)}>
      <SelectTrigger className={value && optional ? "bg-primary/40 text-white" : "bg-[#3C3C3C] text-white"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {optional && (
          <SelectItem value="any" className="text-[rgba(0,0,0,0.25)]">Any</SelectItem>
        )}
        {options.map(opt => (
          <SelectItem value={opt}>{opt}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect