import React from "react";
import "./Task.css";

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

const Ticket = ({ ticket, groupBySelect }) => {
    const { id, userName, status, title, priority, tag } = ticket;

    const groupImages = {
        Backlog: BackLog,
        Todo: Todo,
        "In Progress": InProgress,
        Done: Done,
        Cancelled: Cancelled,
    };

    const priorityImages = [
        NoPriority,
        LowPriority,
        MediumPriority,
        HighPriority,
        UrgentPriority,
    ];

    const renderUserAvatar = () => {
        if (groupBySelect === "user" && userName) {
            return <div className="avatar">{userName[0].toUpperCase()}</div>;
        } else if (groupBySelect !== "user") {
            return <div className="avatar">{userName ? userName[0].toUpperCase() : "X"}</div>;
        }
        return null;
    };

    const renderStatusIcon = () => {
        if (groupBySelect === "status" && groupImages[status]) {
            return <img src={groupImages[status]} alt={status} className="status-icon" />;
        }
        return null;
    };

    const renderPriorityIcon = () => {
        if (priority >= 0 && priority < priorityImages.length && groupBySelect !== "priority") {
            return (
                <img
                    src={priorityImages[priority]}
                    alt={`${priority} Priority`}
                    className="priority-icon"
                />
            );
        }
        return null;
    };

    const renderTicketTag = () => {
        return (
            <div className="ticket-tag">
                <div className="status-dot"></div>
                <p className="tag-name">{tag}</p>
            </div>
        );
    };

    return (
        <div className="task-ticket" key={id}>
            <div className="ticket-header">
                <p className="ticket-id">{id}</p>
                {renderUserAvatar()}
            </div>

            <div className="ticket-body">
                {renderStatusIcon()}
                <p className="ticket-title">{title}</p>
            </div>

            <div className="ticket-footer">
                {renderPriorityIcon()}
                {renderTicketTag()}
            </div>
        </div>
    );
};

export default Ticket;
