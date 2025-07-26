import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

const CustomLayoutToggle = ({ value, onChange, options }) => {
  return (
    <ToggleGroup
      variant="primary"
      type="single"
      value={value}
      onValueChange={(val) => {
        if (val) {
          onChange(val);
        }
      }}
      className="text-white bg-[#3C3C3C] rounded-lg"
    >
      {options.map(opt => (
        <ToggleGroupItem value={opt.value} className="flex justify-center items-center">
          {opt.icon}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default CustomLayoutToggle