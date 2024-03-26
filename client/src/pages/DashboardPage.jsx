import { useContext, useEffect, useState } from "react";
import { Box, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../components/Navbar";
import TaskList from "../components/Tasklist";
// import Add from "../components/Add";
import Searchbar from "../components/Searchbar";
import { theme } from "../theme";
import { useQuery } from "@apollo/client";
import { FINDALLTASKS } from "../hooks/useGetTasks/query";
import { DashboardContext, DashboardProvider } from "../context/dashboardContext";

// const dummyTasks = [
//   {
//     id: 1,
//     title: "First",
//     content: "Some Content"
//   },
//   {
//     id: 2,
//     title: "Second Title",
//     content: "Some other content"
//   },
//   {
//     id: 3,
//     title: "Third Title",
//     content: "Even more Content"
//   },
// ]

function DashboardPage() {
  // const dashboardContext = useContext(DashboardContext);
  // const { data: tasks } = dashboardContext;

  const [tasks, setTasks] = useState([]);
  const { data, loading } = useQuery(FINDALLTASKS, {
    onCompleted: (data) => {
      setTasks(data.tasks);
    },
    fetchPolicy: "network-only",
    // awaitRefetchQueries: true
  });

  useEffect(() => {
    console.log("useEffect");
    console.log(data);
    if(data) setTasks(data.tasks);
  },[data])
  return (
    <ThemeProvider theme={theme}>
      <DashboardProvider >
        <Box position="relative" bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack
            sx={{ marginTop: "20px" }}
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center">
            <Searchbar />
            <TaskList
              tasks={tasks}
              isLoading={loading}
            />
          </Stack>
        </Box>
      </DashboardProvider>
    </ThemeProvider>
  );

}

export default DashboardPage