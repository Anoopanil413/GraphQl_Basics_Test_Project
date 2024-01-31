import { gql } from "apollo-server";


export  const typeDefs = gql`
type User {
id:ID!
name:String!
age:Int!
nationality:String
friends:[User]
favMovies:[Movie]
}

type Movie{
id:ID!
name:String
genre:String
year:String
}

type Query{
users: [User!]!
user(id:ID!):[User]!
movies:MovieResult
movie(name:String!):Movie

}
input createUserInput{
    name:String!
    age:String!
    nationality:String ="Indian"
}

type Mutation{
createUser(input:createUserInput):User
deleteUser(id:ID!):[User]!
}
type MovieSuccessResult{
    movies:[Movie!]!
}
type MovieErrorResult{
message:String!
}

union MovieResult = MovieSuccessResult | MovieErrorResult
`;


