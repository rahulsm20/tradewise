import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";

type SelectOptionType = {
  label: string;
  value: string;
};

type SelectProps = {
  name: string;
  label?: string;
  options: SelectOptionType[];
  value: string;
  icon?: React.ReactNode;
  showLabel?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
};
const TWSelect = ({
  options,
  value,
  label,
  showLabel = true,
  name,
  icon,
}: SelectProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {showLabel && (
        <label htmlFor={name} className="flex">
          {label}
        </label>
      )}
      <Select value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
              {icon}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TWSelect;
