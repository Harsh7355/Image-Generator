import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from "react-toastify";


const URL="http://localhost:8080/api/auth/login"

const Login = () => {
   const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate=useNavigate();
  const {storeTokenInLs}=useAuth();

const handleInput = (e) => {
  const { name, value } = e.target;

  setUser((prevUser) => ({
    ...prevUser,
    [name]: value
  }));
};



   const handleSubmit = async (e) => {
    
    e.preventDefault();
     try{
      const response = await fetch(URL,{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify(user),
      })
      // console.log("Response",response)

    if (response.ok) {
  const data = await response.json(); 
  storeTokenInLs(data.token);  // ✅ Use 'data' not 'res'
  // localStorage.setItem("token", data.token);
  toast.success("Login Successful", {
  position: "top-right",
  autoClose: 3000,
  style: {
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
});
  // alert("Login Successful");
  navigate("/");
  setUser({ email: "", password: "" });
  console.log("Login data:", data);
} else {
  // toast("Invalid Credentials ");
  toast.error("Invalid Credentials", {
  position: "top-right",
  autoClose: 3000,
  style: {
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
});
  console.log("Login failed: ", response);
}


     }catch(error){
        console.log(error)
     }
  
  };






  return <>
    <section>
       <main>
           <div className="section-registation">
              <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>

              <div className="registation-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                <label htmlFor="email">email</label>
                <input  
                   type="text"
                   name="email"
                   value={user.email}
                   onChange={handleInput}
                   placeholder='Enter the email'
                />
                </div>

                <div>

                 <label htmlFor="email">Password</label>
                    <input  
                   type="text"
                   name="password"
                   value={user.password}
                   onChange={handleInput}
                   placeholder='Enter the password'
                />

                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>




                </form>


              </div>

           </div>


         </div>

       </main>

    </section>
  
  
  
  
  
  </>
}

export default Login