import { useLazyQuery, useMutation } from "@apollo/client";
import { createContext } from "react";
import { SEARCH_TASKS } from "../hooks/useSearch/query";
import { CREATE_TASK } from "../hooks/useCreateTask/mutation";
import { TOGGLE_COMPLETED } from "../hooks/useToggleCompleted/mutation";
import { UPDATE_TASK } from "../hooks/useUpdateTask/mutation";
import { DELETE_TASK } from "../hooks/useDeleteTask/mutation";
import { FINDALLTASKS } from "../hooks/useGetTasks/query";

const DashboardContext = createContext({
    searchTasks: (input) => { },
    createTask: (input) => { },
    toggleCompleted: (input) => { },
    updateTask: (input) => { },
    deleteTask: (input) => { },
});

function DashboardProvider(props) {
    const [searchTasks] = useLazyQuery(SEARCH_TASKS, {
        onCompleted: (data) => {
            console.log('SearchTasks onCompleted!...');
        },
        fetchPolicy: "network-only",
        awaitRefetchQueries: true
    }); 

    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries: [FINDALLTASKS, "findAll"],
        fetchPolicy: "network-only",
        awaitRefetchQueries: true
    });

    const [toggleCompleted] = useMutation(TOGGLE_COMPLETED, {
        refetchQueries: [FINDALLTASKS, "findAll"],
        fetchPolicy: "network-only",
        awaitRefetchQueries: true
    });

    const [updateTask] = useMutation(UPDATE_TASK, {
        refetchQueries: [FINDALLTASKS, "findAll"],
        fetchPolicy: "network-only",
        awaitRefetchQueries: true
    });

    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [FINDALLTASKS, "findAll"],
        fetchPolicy: "network-only",
        awaitRefetchQueries: true
    });

    return (
        <DashboardContext.Provider value={{
            // data,
            deleteTask,
            searchTasks,
            createTask,
            updateTask,
            toggleCompleted
        }}
        {...props}
        />
    )
}
export { DashboardContext, DashboardProvider };