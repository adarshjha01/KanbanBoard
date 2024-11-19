import React, { useState } from "react";
import "./Dropdown.css";
import DisplayIcon from "../../assets/Display.svg";
import DownIcon from "../../assets/down.svg";

const Dropdown = ({ 
    selectedGroup, 
    selectedOrder, 
    setSelectedGroup, 
    setSelectedOrder, 
    groupOptions = ["status", "user", "priority"], 
    orderOptions = ["priority", "title"] 
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // This is the function that handles the change, and we pass in the setter directly.
    const handleOptionChange = (setter, value) => {
        setter(value);
        setIsDropdownOpen(false);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <img src={DisplayIcon} alt="Display Icon" />
                <p>Display</p>
                <img src={DownIcon} alt="Dropdown Icon" />
            </button>

            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-section">
                        <label>
                            <span>Group By</span>
                            <select value={selectedGroup} onChange={(e) => handleOptionChange(setSelectedGroup, e.target.value)}>
                                {groupOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="dropdown-section">
                        <label>
                            <span>Order By</span>
                            <select value={selectedOrder} onChange={(e) => handleOptionChange(setSelectedOrder, e.target.value)}>
                                {orderOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
