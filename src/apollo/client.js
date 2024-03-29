import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import {AUTH_TOKEN} from './constants';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-fetch';



const link = createUploadLink({
	uri: "https://infinite-cove-53014.herokuapp.com/graphql",
  fetch
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});