import { gql } from "@apollo/client";

export const SEARCH_TASKS = gql`
    query Search($input: String){
    search(searchString: $input){
        id
        title
        content
        completed
        owner {
            id
        }
    }
}
`;