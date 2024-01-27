import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  console.log(name, status);
  const [task, setTask] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setTask([...task, { name, status }]);
    setName("");
    setStatus("");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>

        {/* Form Section  */}
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handelSubmit}
          >
            <div className="col-auto">
              <input type="text" className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>

            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "Active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "Active" && "Active"}`}
                type="button"
                onClick={() => handleClick("Active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "Completed" && "Active"}`}
                type="button"
                onClick={() => handleClick("Completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
