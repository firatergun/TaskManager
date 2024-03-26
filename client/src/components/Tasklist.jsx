import { Box, Stack, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import Task from "./Task";

const TaskList = ({ tasks=[], isLoading = true }) => {
  // const [loading, setLoading] = useState(isLoading);
  console.log("TaskList...");
  console.log(tasks);
  // setTimeout(() => {
  //   setLoading(false);
  // }, [3000]);

  if (isLoading) return (
    <Stack sx={{ margin: 5, width: "400px", height: "280" }} spacing={1}>
      <Skeleton variant="rectangular" height={300} />
    </Stack>
  );

  if (tasks && tasks.length === 0) return (<>
    <Stack variant='text'>
      <Typography>No Tasks</Typography>
    </Stack>
  </>);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Stack spacing={1}>
      {
        tasks.map((task) => 
        (<>
            <Task task={task} key={task.id}/>
        </>)
        )
      }
      </Stack>
    </Box>
  );
};

export default TaskList;
