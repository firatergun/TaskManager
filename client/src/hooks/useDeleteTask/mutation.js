import { gql } from "@apollo/client";

export const DELETE_TASK = gql`
mutation deleteTask($input: Int!){
    removeTask(id: $input){
        id
        title
        content
        updatedAt
        owner {
            id
        }
    }
}
`;