import { gql } from "@apollo/client";

const GET_POSTS_COUNT = gql`
  query postsCount {
    getPostsCount
  }
`;

const GET_POST_COUNT_OF_CAT = gql`
  query getPostsForEachCat($fromDate: String!, $toDate: String!) {
    getPostsForCategories(fromDate: $fromDate, toDate: $toDate) {
      id
      category {
        id
        name        
      }
    }
  }
`;

const POSTS_BRIEF_INFO_BY_CAT = gql`
  query getPostsByCategoryId(
    $catId: String!
    $toDate: String!
    $fromDate: String!
  ) {
    getPostsByCategoryId(fromDate: $fromDate, toDate: $toDate, catId: $catId) {
      id
      postTitle
      createdAt 
      user {
        username
      }          
    }
  }
`;

const POST_COUNT_FOR_MONTHS = gql`
  query getPostCountForGraph($monthsArray: [MonthsArrayInput!]!) {
    getPostCountForGraph(monthsArray: $monthsArray)
  }
`;

export {
  GET_POST_COUNT_OF_CAT,
  POSTS_BRIEF_INFO_BY_CAT,
  GET_POSTS_COUNT,
  POST_COUNT_FOR_MONTHS,
};
