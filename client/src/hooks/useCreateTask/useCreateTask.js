import { useMutation } from "@apollo/client"
import { CREATE_TASK } from "./mutation"

export const useCreateTask = (title, content) => {
    // TODO set variable !.
    const [createTask, { loading }] = useMutation(CREATE_TASK,);
    return [createTask, loading];
}