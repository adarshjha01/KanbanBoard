import React from "react";
import "./Column.css";
import Ticket from "../Ticket/Task";

import NoPriority from "../../assets/No-priority.svg";
import LowPriority from "../../assets/Img - Low Priority.svg";
import MediumPriority from "../../assets/Img - Medium Priority.svg";
import HighPriority from "../../assets/Img - High Priority.svg";
import UrgentPriority from "../../assets/SVG - Urgent Priority colour.svg";
import BackLog from "../../assets/Backlog.svg";
import Todo from "../../assets/To-do.svg";
import InProgress from "../../assets/in-progress.svg";
import Done from "../../assets/Done.svg";
import Cancelled from "../../assets/Cancelled.svg";
import Add from "../../assets/add.svg";
import Dots from "../../assets/3 dot menu.svg";

const Column = ({ data, groupBy }) => {
    const getGroupImage = (groupKey) => {
        switch (groupKey) {
            case "No Priority":
                return NoPriority;
            case "Low Priority":
                return LowPriority;
            case "Medium Priority":
                return MediumPriority;
            case "High Priority":
                return HighPriority;
            case "Urgent Priority":
                return UrgentPriority;
            case "Backlog":
                return BackLog;
            case "To Do":
                return Todo;
            case "In Progress":
                return InProgress;
            case "Done":
                return Done;
            case "Cancelled":
                return Cancelled;
            default:
                return null;
        }
    };

    return (
        <div className="board-container">
            {Object.entries(data).map(([groupKey, tickets]) => (
                <div key={groupKey} className="ticket-column">
                    <div className="column-heading">
                        <div className="column-header">
                            {/* Use the appropriate image for each group */}
                            {getGroupImage(groupKey) ? (
                                <img
                                    src={getGroupImage(groupKey)}
                                    alt={groupKey}
                                    className="column-img"
                                />
                            ) : (
                                <div className="user-logo">
                                    {tickets[0]?.userName
                                        ? tickets[0].userName[0].toUpperCase()
                                        : "U"}
                                </div>
                            )}
                            <h4>{groupKey}</h4>
                        </div>
                        <div>
                            <img src={Add} alt="Add" />
                            <img src={Dots} alt="More options" />
                        </div>
                    </div>

                    {tickets.map((ticket) => (
                        <Ticket key={ticket.id} ticket={ticket} groupBy={groupBy} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Column;
