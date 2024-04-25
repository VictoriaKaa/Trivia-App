import { useEffect, useState } from "react";
import "./SettingsComponent.scss";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Category } from "../../store/features/triviaData";
import ToggleButtons from "../ToggleButtons/ToggleButtons";

interface SettingsComponentProps {
  mode: any;
  categories: Category[];
  dispatchMode: (a: any, b: any) => void;
}

const SettingsComponent = ({ mode, categories, dispatchMode }: SettingsComponentProps) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');

  useEffect(() => {
    setCategory(mode.category);
  }, [mode])

  const showTypeBtn = (types: string[], modeName: string) => {
    return <ToggleButtons modeName={modeName} types={types} handleClick={dispatchMode} mode={mode} />
  }

  const selectCategory = (event: SelectChangeEvent): void => {
    const newCategory = event.target.value;
    dispatchMode('category', newCategory)
    setCategory(newCategory);
  }

  const showCategorySelect = () => {
    return <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category}
        label="Select Category"
        onChange={selectCategory}
      >
        {categories.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
        <MenuItem key={'any'} value={0}>Any</MenuItem>
      </Select>
    </FormControl>
  }

  const navigateToGame = () => {
    navigate('/game');
  }

  return (
    <div className="settings-block">
      <div>{showTypeBtn(['easy', 'medium', 'hard', 'any'], 'difficulty')}</div>
      <div className="settings-category">{showCategorySelect()}</div>
      <div>{showTypeBtn(['True\\False', 'Multiple', 'any'], 'type')}</div>
      <div className="settings-start-button">
        <Button variant="contained" color="secondary" onClick={navigateToGame}>Start Quiz</Button>
      </div>
    </div>
  );
};

export default SettingsComponent;
