import './App.css';

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import DisplayComp from './components/DisplayComp';
import MovieSearchTab from './components/MovieSearchTab';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:"http://localhost:4000/graphql"

  })
  return (
    <ApolloProvider client={client}>

    <div className="App">
      <MovieSearchTab/>
      <DisplayComp/>
    
    </div>
    </ApolloProvider>
  );
}

export default App;
