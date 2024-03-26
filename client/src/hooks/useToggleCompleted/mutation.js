import { gql } from "@apollo/client";

export const TOGGLE_COMPLETED = gql`
    mutation toggleCompleted($input: Int!){
    toggleCompleted(id: $input){
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