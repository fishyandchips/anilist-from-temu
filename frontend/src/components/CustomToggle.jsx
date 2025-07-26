import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

const CustomToggle = ({ value, onChange, label, options }) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(val) => {
        if (val) {
          onChange(val);
        }
      }}
      className="text-white flex flex-col"
    >
      <span className="text-[0.8rem] opacity-50 text-white w-full">{label}</span>
      {options.map(opt => (
        <ToggleGroupItem value={opt} className="w-full">{opt}</ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default CustomToggle