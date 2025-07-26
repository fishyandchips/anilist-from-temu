import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

const CustomMediumToggle = ({ value, onChange, options }) => {
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
      className="text-white bg-[#3C3C3C] rounded-full"
    >
      {options.map(opt => (
        <ToggleGroupItem value={opt} className="flex justify-center items-center rounded-full font-bold px-[2rem]">
          {opt}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default CustomMediumToggle