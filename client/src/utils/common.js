import axios from "axios";

const UserDetailRow = ({ icon, value }) => {
    return(
        <p className='flex items-center mb-4 text-xl '> {icon}<span className='ms-4'/>{value}</p>
    )
}

const getCurrentUser = () => {
    const user = localStorage.getItem("e-commerce-user-details");

    if(!user){
        return null;
    }
    else{
        return JSON.parse(user);
    }
}

const jwtToken = () => {
    const token = localStorage.getItem("e-commerce-user-token");

    if(!token){
        return null;
    }
    else{
        return `bearer ${token}`;
    }
}

const logout = () => {
    localStorage.clear();

    setTimeout(() => {
        window.location.href = "/login";
    }, 3000);
}

//date time dikane ke lie
const getReadableTimeStamp = (date) => {
    const dateObj = new Date(date);
    
    return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
  };

  //length of text decrease karne ke lie
  const shortText = (text, maxLength = 50) => {
    if(!text){
        return "";
    }
    if(text.length <= maxLength){
        return text;
    }
    let shortText = text.substring (0, maxLength - 3);
     shortText += " ...";
     return shortText;
  }

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })

export { getCurrentUser, jwtToken, logout ,UserDetailRow ,getReadableTimeStamp, shortText , api }
