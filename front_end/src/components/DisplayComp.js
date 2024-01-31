import React, { useState } from 'react'
import {useQuery,gql, useMutation} from '@apollo/client'

const GET_ALL_USERS = gql`
query findAllusers {
  users {
    id
    name
    age

  }
}
`
const CREATE_USER = gql`
  mutation createUser($createUserInput: createUserInput!) {
    createUser(input: $createUserInput) {
      name
      age
      nationality
    }
  }
`;

const DisplayComp = () => {

    const [userName,setuserName] = useState()
    const [age,setAge] = useState()
    const [nationality,setNationality] = useState()
    const [message,setMessage] = useState()
 

    const {data,loading,error,refetch} = useQuery(GET_ALL_USERS)
    if(data)console.log(data)
    if(loading)console.log("Loading")
    if(error)console.log("error")
    const [createNewUser,{data:createdData,loading:creationLoading}] = useMutation(CREATE_USER)
 
    if(createdData)console.log("error")

    const handleSubmit =()=>{
        if(!userName || !age || !nationality){
            return setMessage("Enter all values")
        }else{
            createNewUser({variables:{createUserInput :{name:userName,age,nationality}}})
            refetch()
        }

    }


  return (
    <div>
        {loading && <div>loading.......</div>}
        {data && data.users.map((user)=>{
            return (<ul key={user.id}>
            <li>
                Name:{user.name}
            </li>
            <li>
                age:{user.age}
            </li>
       </ul>)
        })
        

        }

        <div>
            Create new user!
        </div>
        <div>
            <input type='text' placeholder='name' onChange={(e)=>setuserName(e.target.value)}/>
            <input type='text' placeholder='age' onChange={(e)=>setAge(e.target.value)}/>
            <input type='text' placeholder='nationality' onChange={(e)=>setNationality(e.target.value)}/>
            {!creationLoading && <button onClick={handleSubmit}>Submit</button>}
            {/* {createdData && <div>{createdData}</div>} */}
        </div>
        {message && <div>{message}</div>}
       
      
    </div>
  )
}

export default DisplayComp
