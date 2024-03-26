import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
  setRef,
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useState } from "react";
import { useForm } from "../hooks/useForm";
import { DashboardContext } from "../context/dashboardContext";

const Task = ({ task }) => {
  const { updateTask, deleteTask } = useContext(DashboardContext);
  const [edit, setEdit] = useState(false);
  const { id, title = '', content = '', completed = false } = task;
  const [loading, setLoading] = useState(false);

  function onDelete(e) {
    setLoading(true);
    deleteTask({ variables: { input: id } });
    setLoading(false);
  }
  function onSaveEdit(e) {
    onSubmit(e);
    setEdit(false);
  }
  function callUpdateTask() {
    setLoading(true);
    updateTask({variables: { input: values }});
    setLoading(false);
  };
  const { onChange, onSubmit, values } = useForm(callUpdateTask, {
    title,
    content
  });
  
  return (
    <Card
      sx={{ margin: 5, width: "400px", height: "280" }}
    >
      {edit ?
        (
          <TextField
            sx={{ width: "90%", margin: "20px 0", padding: "0 20px" }}
            name='title'
            placeholder="title"
            variant="standard"
            value={values.title}
            onChange={onChange}
            onBlur={onChange}
          />
        )
        :
        (<CardHeader
          // sx={{ fontSize: "40px" }}
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {/* {user.username && user.username.charAt(0)} */}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={title}
        />
        )
      }
      {edit ? 
        (<TextField
          sx={{ width: "90%" , margin: "20px 0", padding: "0 20px"}}
          id="standard-multiline-static"
          name='content'
          multiline
          // rows={3}
          maxRows={3}
          placeholder="Content"
          variant="standard"
          value={values.content}
          onChange={onChange}
          onBlur={onChange}
        />)
          :
        (<CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>)
      }
        <CardContent > 
        {/* Move to it's own component */}
            { completed ?
              (
            <Chip color="success" sx={{ width: "350px"}} icon={<DoneIcon />} label="Completed" />
              )
              :
              (   
                <Chip variant="outlined" sx={{ width: "350px"}} color="warning" label="Not Completed" />
              )
            }
        </CardContent>
      {/* <ButtonGroup
            sx={{ marginTop: "20px"}}
            variant="contained"
            aria-label="outlined primary button group"
          > */}
        <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
        >
        <Button
          startIcon={<EditIcon />}
          onClick={() => setEdit(true)}
            sx={{ background: "yellow", width: "100px" }}>
              {edit ? "Save" : "Edit"}
          </Button>
        {/* TODO Add Save Edit Button */}
        {/* TODO Add Cancel Edit Button */}
          <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={(e) => onDelete(e)}
              color={"error"}
              // disabled={loading}
          />
        </Stack>
          {/* </ButtonGroup> */}
    </Card>
  );
};

export default Task;
