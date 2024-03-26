import { gql } from "@apollo/client";

export const FINDALLTASKS = gql`
  query findAll{
    tasks{
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