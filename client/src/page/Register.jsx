import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate=useNavigate();
  const{ storeTokenInLs}=useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
     
      // const responseData = await response.json();
      //  console.log(responseData);
     
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        storeTokenInLs(responseData.token)
        // localStorage.setItem(responseData);
           toast.success("Registation Successful", {
           position: "top-right",
           autoClose: 3000,
           style: {
             backgroundColor: "green",
             color: "white",
             fontWeight: "bold",
             fontSize: "1.2rem",
           },
         });
        // alert("registration successful");
        navigate("/")
        setUser({ username: "", email: "", phone: "", password: "" });
        console.log(responseData);
      }else{
        // alert("Not a valid registation")
        // toast("Not a valid registation")
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
      }
      

      
      // else {
      //   console.log("error inside response ", "error");
      // }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default Register