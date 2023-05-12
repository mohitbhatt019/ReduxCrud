import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailsSlice";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const Read = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  //here we filter all data from state, and app is in store
  //we have filter users and loading from app(store)
  const { users, loading } = useSelector((state) => state.app);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, []);
  //console.log(users, "Read component");

  if (loading) {
    return <h2>...Loading</h2>;
  }

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All Data</h2>
      {users.map((ele) => (
        <div key={ele.id} className="card w-50 mx-auto my-2">
          <div className="card-body">
            <h5 className="card-title">{ele.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
            {/* <h7 className="card-text">{ele.age}</h7><br/> */}
            <h8 className="card-subtitle mb-2 text-muted">{ele.gender}</h8>
            <br />
            <h9 className="card-subtitle mb-2">
              <button
                className="btn btn-primary m-2 card-link"
                onClick={() => [setId(ele.id), setShowPopup(true)]}
              >
                View
              </button>
              <Link to={`/edit/${ele.id}`} className="btn btn-primary m-2">Edit</Link>
              <Link className="btn btn-primary m-2" onClick={()=>dispatch(deleteUser(ele.id))}>Delete</Link>
            </h9>

            {/* <button
                    className="card-link"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </button> */}
            {/* <Link to={`/edit/${ele.id}`} className="card-link">
                    Edit
                  </Link>
                  <Link
                    onClick={() => dispatch(deleteUser(ele.id))}
                    className="card-link"
                  >
                    Delete
                  </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Read;
