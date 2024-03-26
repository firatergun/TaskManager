import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
    mutation createTask($input: CreateTaskInput!){
        createTask(createTaskInput: $input){
            id
            title
            content
            createdAt
            completed
            owner{
                id
                username
                email
            }
        }
    }
`;