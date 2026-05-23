import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const availableWeeks = [
  { id: 1, date: "18/05" },
  { id: 2, date: "25/05" },
  { id: 3, date: "1/06" },
];

export default function WeekDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(availableWeeks[0]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (week) => {
    setSelectedWeek(week);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <span 
        onClick={handleClick} 
        style={{ 
          cursor: "pointer", 
          fontWeight: "bold",
          userSelect: "none",
        }}
      >
        <p style={{fontFamily: "Inter, sans-serif"}}>{selectedWeek.date}  ▼</p>
      </span>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {availableWeeks.map((week) => (
          <MenuItem
            key={week.id}
            onClick={() => handleSelect(week)}
            selected={week.id === selectedWeek.id}
          >
            <p style={{fontFamily: "Inter, sans-serif"}}>{week.date}</p>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}