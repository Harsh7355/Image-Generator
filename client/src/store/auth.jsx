import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [Service,setService]=useState("");
  const authorizationtoken= `Bearer ${token}`

  const storeTokenInLs = (token) => {
    setToken(token)
    localStorage.setItem("token", token);
    setToken(token);
  };

  let isLoggedin = !!token;

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // jwt authentication to get the user data

  const userAuthentication = async () =>{
    try{
      const response= await fetch('http://localhost:8080/api/auth/user', {
        method:"GET",
        headers:{
          Authorization :authorizationtoken,
        }
      });

      if(response.ok){
        const data=await response.json();
        console.log("user data",data.userData)
        setUser(data.userData)

      }
    }
    catch(error){
      console.log("Erorr fetching details",error)
    }
  }

  const getservices=async ()=>{
      try {
      const response = await fetch('http://localhost:8080/api/data/service', {
        method: "GET",
      });


      if(response.ok){
        const data=await response.json();
        console.log(data)
        setService(data)
      }
    }
    catch(error){
       console.log("Error fetching details",error)
    }
  }

 useEffect(() => {
    getservices();
    userAuthentication();
}, []);


  return (
    <AuthContext.Provider value={{ isLoggedin,storeTokenInLs, LogoutUser, user,Service,authorizationtoken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
