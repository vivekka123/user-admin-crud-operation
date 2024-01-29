import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import "../css/Homepage.css";

const HomePage = () => {
    //  const [items, setItems] = useState([]);
    const [userData, setUserData]= useState([]);
    

    useEffect(()=>{
        axios.get("http://localhost:6060/get-all")
        .then((response)=>{
            setUserData(response.data);
            console.log(response.data);
            // let jsonString=JSON.stringify(response.data);
            // document.write(jsonString);
        })
        .catch((error)=>{
            console.log(error);
        });
    }, []);

    const onDelete = async (id) => {
        console.log(id);
        try {
            await axios.delete(`http://localhost:6060/delete/${id}`,id);
            setUserData(userData.filter((user)=> user._id !== id));
            
        } catch (error) {
            console.log(error);
        }
    }
   
  return (
    <div className='d-flex justify-content-center align-items-center w-100 flex-column'>
        <h3>User Data</h3>
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col' className='table-data'>ID</th>
                        <th scope='col' className= 'table-data'>Email ID</th>
                        <th scope='col' className= 'table-data'>User Name</th>
                        <th scope='col' className= 'table-data'>Password</th>
                        <th scope='col' className= 'table-data'>Phone Number</th>
                        <th scope='col' className= 'table-data'>Update</th>
                        <th scope='col' className= 'table-data'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index)=>{ return (

                        <tr key={user._id}>
                            <th scope='row'>{index}</th>
                           
                            <td>{user.email}</td>
                            <td>{user.userName}</td>
                            <td>{user.password}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                <Link
                                to={"/update/" + user._id}
                                style={{textDecoration: "none"}}
                                >
                                    <PencilSquare />
                                </Link>
                            </td>

                            <td onClick={()=> onDelete(user._id)}
                            >
                                <Trash />
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default HomePage