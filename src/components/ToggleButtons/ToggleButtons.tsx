import { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface ToggleButtonsProps {
  mode: any;
  modeName: string;
  types: any[];
  handleClick: (modeName: string, item: string) => void
}

const ToggleButtons = ({ mode, modeName, types, handleClick }: ToggleButtonsProps) => {
  const [modeType, setModeType] = useState('');

  const handleAlignment = (modeName: string, item: string): void => {
    setModeType(item);
    handleClick(modeName, item);
  }

  useEffect(() => {
    setModeType(mode[modeName]);
  }, [mode])

  return <ToggleButtonGroup
    color="primary"
    value={modeType}
    exclusive
    aria-label={modeName}>
    {types.map((item, index) =>
      <ToggleButton key={item + index} value={item} onClick={() => handleAlignment(modeName, item)}>
        {item}
      </ToggleButton>)}
  </ToggleButtonGroup>
};

export default ToggleButtons;
