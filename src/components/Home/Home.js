import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

// import "./Home.css";

import { CreateInterview } from "../Interview";

export default function Home() {
  return (
    <div class="m-5">
      <Link to="/create-interview">Create</Link>
      <Link to="/interviews">List</Link>
    </div>
  );
}
