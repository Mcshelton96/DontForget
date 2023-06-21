import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [users, setUsers] = useState([]);

    const GetAllUsers = () => {
        return fetch("/api/user")
            .then((res) => res.json())
            .then(setUsers);
    };

    const addUser = (user) => {
        return fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    };

    const editUser = (Id, user) => {
        return fetch(`/api/user/${Id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    };

    const deleteUser = (Id, user) => {
        return fetch(`/api/user/${Id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    };

    const getUserById = (id) => {
        return fetch(`/api/user/${id}`)
        .then((res) => res.json());
    };

    return (
        <UserContext.Provider value={{ users, GetAllUsers, addUser, editUser, deleteUser, getUserById }}>
            {props.children}
        </UserContext.Provider>
    );
}