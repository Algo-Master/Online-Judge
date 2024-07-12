import React, { useState, useEffect } from "react";
import up from "../Assets/arrow-up.png";
import down from "../Assets/down-arrow.png"
import "./Dropdown.css";

const Dropdown = ({ items, onSelect, defaultItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem);

  useEffect(() => {
    setSelectedItem(defaultItem);
  }, [defaultItem]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <span style={{ paddingRight: "20px" }}>{selectedItem}</span>
        <div>
          <img className="updown" src={isOpen ? up : down} />
        </div>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <div
              className="dropdown-item"
              key={index}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
