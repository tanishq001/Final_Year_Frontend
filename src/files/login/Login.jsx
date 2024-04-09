import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
// import { toast,ToastContainer } from "react-toastify"
import toast, { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css"

const Login=() =>{
  const navigate=useNavigate()
    const [inputs, setInputs] = useState({
      username:"",
      password:"",
    });

    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');

    const handleChange = (e) =>{
      setInputs((previousState) => ({
        ...previousState,
        [e.target.name]: e.target.value,
      }));
    };

    const sendRequest = async () => {
      // add your api endpoint for login 
      console.log(username,password)
    try {
      const response = await fetch(`http://localhost:8000/api/signinuser?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      if(response.ok){
        let data=await response.json()
        
        console.log(data.message);  
        localStorage.setItem("isActiveUser", true)
        if(localStorage.getItem("isActiveUser")){
          navigate("/home")
          
        }
      }
      else
      {
        toast.error("Please fill at least 1 filter")
        console.log(response);
      }
    } 
    catch(error) {
      console.error('Error :',error)
    }
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(inputs);
      sendRequest();
  };
  return (
    <>
    <div><Toaster
  position="top-right"
  reverseOrder={false}
/></div>
    <div className="bg-black h-screen w-screen">
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-md w-full px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Emotunes</h1>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl mb-4 font-semibold text-white text-center">Sign In</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="username"
                placeholder="Enter Your Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                name="username"
                // value={inputs.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                name="password"
                // value={inputs.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-400">New to EmoTunes? </span>
            <Link to="/register" ><b className="text-blue-600 cursor-pointer">Sign up Now!</b></Link>
  
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
export default Login;