import React, { Component } from 'react';
import './App.css';

import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";

const httpLink = new HttpLink({
  uri: "https://grpahiql.herokuapp.com/v1alpha1/graphql"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const getPosts = gql`
query getFilms{
  allFilms {
    films{
      title
    }
  }
}
`;
class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <Query query={getPosts}>
            {({ data, error, loading }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error...</div>;
              return data.allFilms.films.map(function (film, index) {
                return <li index>{film.title}</li>
              });
            }}
          </Query>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
