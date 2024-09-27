import { ChevronDown } from "lucide-react";
import { Button } from "../@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../@/components/ui/popover";
import { useEffect, useState } from "react";
import Loading from "./Loading";

type ComboboxProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearchChange: (value: string) => void;
  icon?: React.ReactNode;
};

export function TWCombobox({
  options,
  placeholder,
  onChange,
  onSearchChange,
  icon,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Debounced search handler
  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      onSearchChange(searchValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
      setLoading(false);
    };
  }, [searchValue, onSearchChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((framework) => framework.value === value)?.label
            : placeholder
            ? placeholder
            : "Select option"}
          {icon ? (
            icon
          ) : (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 left-0">
        <Command>
          <CommandInput
            placeholder="Search stock..."
            className="h-9"
            onValueChange={(value) => setSearchValue(value)}
          />
          <CommandList>
            <CommandEmpty>
              {loading ? <Loading /> : "No stocks found."}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
