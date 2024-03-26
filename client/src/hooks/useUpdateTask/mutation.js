import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
    mutation updateTask($input: UpdateTaskInput!){
    updateTask(updateTaskInput: $input){
        id
        title
        content
        updatedAt
        completed
        owner {
            id
        }
    }
}
`;