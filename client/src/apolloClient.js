import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: "http://localhost:5001/graphql/"
});

const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem('token');
  
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  
    // Call the next link in the middleware chain.
    return forward(operation);
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;