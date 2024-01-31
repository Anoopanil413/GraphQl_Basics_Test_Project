import { UserList,MovieList } from "../MyData.js"

export const resolvers = {
    Query:{
        users(){
            return UserList;
        },
        user(parent,args){
            const id = args.id;
            const user = UserList.filter((user)=>user.id == id )
            console.log(user)
            return user;
        },
        movies:()=>{
            if(MovieList)return {movies :MovieList}
            return {message:"Hey error fetching movie list!!"}
        },
        movie:(parent,args)=>{
            console.log("heyyyyyy",args)
            const moviename = args.name;
            const movie = MovieList.find((movie) => movie.name === moviename);

            return movie
        }
       
    },
    User:{
        favMovies:() =>{
            return MovieList.filter((movie)=>movie.genre==="Crime")

        }
    },
    Mutation:{
        createUser:(parent,args)=>{
            console.log("here comes the argsss",args)
            let user = args.input
            user.id = new String(Number(UserList[UserList.length-1].id)+1)
            UserList.push(user)
            return user
        },
        deleteUser:(parent,args)=>{
            let id = args.id
            let user = UserList.filter((user)=>user.id!=id)
            return user
        }
    },
    MovieResult:{
        __resolveType(obj){
            if(obj.movies){
                return "MovieSuccessResult"
            }
            if(obj.message){
                return "MovieErrorResult"
            }
            return null
                       
        }
         
    }
  
}