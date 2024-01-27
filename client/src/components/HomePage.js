import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


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
    // const handleDelete = (id) => {
    //     axios.delete(`/api/items/${id}`)
    //       .then(() => {
    //         const updatedItems = userData.filter((user) => user._id !== id);
    //         setItems(updatedItems);
    //       })
    //       .catch((error) => {
    //         console.error('Error deleting item:', error);
    //       });
    //   };
   
  return (
    <div className='d-flex justify-content-center align-items-center w-100 flex-column'>
        <h3>User Data</h3>
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Email ID</th>
                        <th scope='col'>User Name</th>
                        <th scope='col'>Password</th>
                        <th scope='col'>Phone Number</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index)=>{ return (

                        <tr key={user._id}>
                            <th scope='row'>{index}</th>
                           
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.phonenumber}</td>
                            <td>
                                <Link
                                to={"/update/" + user._id}
                                style={{textDecoration: "none"}}
                                >
                                    <PencilSquare />
                                </Link>
                            </td>
                            {/* <td>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </td> */}

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