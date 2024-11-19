import React, { useState, useEffect } from "react";
import "./BoardView.css";
import ColumnSection from "../Column/Column";
import SettingsMenu from "../Dropdown/Dropdown";

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupingCriteria, setGroupingCriteria] = useState(
        localStorage.getItem("groupBy") || "status"
    );
    const [sortingCriteria, setSortingCriteria] = useState(
        localStorage.getItem("orderBy") || "priority"
    );

    const priorityLevels = {
        0: "NoPriority",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Urgent",
    };

    useEffect(() => {
        const fetchTicketsAndUsers = async () => {
            try {
                const response = await fetch(
                    "https://api.quicksell.co/v1/internal/frontend-assignment"
                );
                const data = await response.json();
                setTickets(data.tickets);
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTicketsAndUsers();
    }, []);

    useEffect(() => {
        localStorage.setItem("groupBy", groupingCriteria);
        localStorage.setItem("orderBy", sortingCriteria);
    }, [groupingCriteria, sortingCriteria]);

    const categorizeTickets = (tickets) => {
        const userMap = users.reduce((map, user) => {
            map[user.id] = user.name;
            return map;
        }, {});

        return tickets.reduce((categories, ticket) => {
            let key;
            if (groupingCriteria === "status") {
                key = ticket.status;
            } else if (groupingCriteria === "user") {
                key = userMap[ticket.userId];
                ticket.userName = userMap[ticket.userId];
            } else if (groupingCriteria === "priority") {
                key = priorityLevels[ticket.priority];
                ticket.priorityLabel = priorityLevels[ticket.priority];
            }
            if (!categories[key]) categories[key] = [];
            categories[key].push(ticket);
            return categories;
        }, {});
    };

    const sortTickets = (categorizedTickets) => {
        return Object.keys(categorizedTickets).reduce((sortedCategories, categoryKey) => {
            sortedCategories[categoryKey] = categorizedTickets[categoryKey].sort((a, b) => {
                if (sortingCriteria === "priority") return b.priority - a.priority;
                if (sortingCriteria === "title") return a.title.localeCompare(b.title);
                return 0;
            });
            return sortedCategories;
        }, {});
    };

    const categorizedAndSortedTickets = sortTickets(categorizeTickets(tickets));

    return (
        <div className="kanban-wrapper">
            <div className="settings-menu">
            <SettingsMenu
                selectedGroup={groupingCriteria}
                selectedOrder={sortingCriteria}
                setSelectedGroup={setGroupingCriteria}
                setSelectedOrder={setSortingCriteria}
            />
            </div>
            <div className="kanban-board">
                <ColumnSection data={categorizedAndSortedTickets} groupBy={groupingCriteria} />
            </div>
        </div>
    );
};

export default KanbanBoard;
