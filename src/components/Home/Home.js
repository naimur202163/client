import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const [user, setUser] = useState([]);
  const [isDelete, setIsDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((result) => setUser(result));
  }, [isDelete]);
  console.log(user);


  // Delet 
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/deleteUser/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': "application/json" },
    })
    .then((res)=>res.json())
    .then((result) => {
      if (result.deletedCount) {
          setIsDelete(true);
          alert('Do You want to Delet it')
      } else {
          setIsDelete(false);
      }
  });
  }







  return (
    <div>
      <div className="allusers d-flex justify-content-center align-items-center">
        <div className="row">
          {user?.map((pd) => (
            <div className="col-md-6 ">
              <div className="user border border p-2 m-2">
                <h1>{pd.name}</h1>
                <h6>{pd.email}</h6>
                <h6>{pd.phone}</h6>
                <h6>{pd.password}</h6>
                <button onClick={() => { handleDelete(pd._id) }} className="btn btn-danger p-1 m-2">Delete</button>
                <Link to={`/update/${pd._id}`}>
                  <button className="btn btn-success p-1 m-2">Update</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
