import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailsSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { users, loading } = useSelector((state) => state.app);
  const [updateData, setUpdateData] = useState();
  useEffect(() => {
    debugger
    if (id) {
      const singleUser = users.filter((ele) => ele.id == parseInt(id));
      setUpdateData(singleUser[0]);
    }
  }, [id]);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  console.log(updateData, "updated data");

  const handleUpdate=(e)=>{
    e.preventDefault();
    dispatch(updateUser(updateData))
    navigate("/read")
  }

  return (
    <div>
      {" "}
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            value={updateData && updateData.name}
            name="name"
            class="form-control"
            onChange={newData}
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            value={updateData && updateData.email}
            name="email"
            class="form-control"
            onChange={newData}
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Age</label>
          <input
            value={updateData && updateData.age}
            type="text"
            name="age"
            class="form-control"
            onChange={newData}
            required
          />
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            name="gender"
            value="Male"
            checked={updateData && updateData.gender == "Male"}
            type="radio"
            onChange={newData}
            required
          />
          <label class="form-check-label">Male</label>
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            name="gender"
            checked={updateData && updateData.gender == "Female"}
            value="Female"
            type="radio"
            onChange={newData}
          />
          <label class="form-check-label">Female</label>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
