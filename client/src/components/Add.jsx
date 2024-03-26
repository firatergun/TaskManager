import {
  Button,
  ButtonGroup,
  Fab,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  Add as AddIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { CREATE_TASK } from "../hooks/useCreateTask/mutation";
import { FINDALLTASKS } from "../hooks/useGetTasks/query";
import { useMutation } from "@apollo/client";
import { useForm } from "../hooks/useForm";
import { DashboardContext } from "../context/dashboardContext";

const SytledModal = styled(Modal)({
  // background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// const UserBox = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
//   marginBottom: "20px",
// });

const Add = () => {
  const [open, setOpen] = useState(false);
  const { createTask } = useContext(DashboardContext);
  function callCreateTask() {
    createTask({variables: { input: values }});
  }

  const { onChange, onSubmit, values } = useForm(callCreateTask, {
    title: '',
    content: '',
  });

  // const [createTask, { loading }] = useMutation(CREATE_TASK, {
  //   refetchQueries: [FINDALLTASKS, "tasks"],
  //   variables: { input: values }
  // });

  function onSave(e) {
    // e.preventDefault();
    onSubmit(e);
    setOpen(false);
  }

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="New Task"
      >
        <Fab color="primary" aria-label="add" size="small">
          <AddIcon />
        </Fab>
      </Tooltip>

      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create Task
          </Typography>
          
          <TextField
            sx={{ width: "100%", margin: "20px 0" }}
            placeholder="title"
            name="title"
            variant="standard"
            onChange={onChange}
            onBlur={onChange}
          />
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            name="content"
            multiline
            maxRows={3}
            placeholder="Content"
            variant="standard"
            onChange={onChange}
            onBlur={onChange}
          />
          <ButtonGroup
            fullWidth
            sx={{ marginTop: "20px"}}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={(e)=>onSave(e)}
              // disabled={loading}
            >Save
            </Button>
            {/* <Button sx={{ width: "100px" }}>
              Edit
            </Button> */}
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
