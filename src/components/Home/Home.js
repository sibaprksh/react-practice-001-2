import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../actions";

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [list] = useState([
    { name: "Java" },
    { name: "JavaScript" },
    { name: "CSS" },
    { name: "HTML" },
    { name: "Angular" },
    { name: "ReactJs" },
    { name: "NodeJs" },
    { name: ".NET" }
  ]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([
    { name: "NodeJs" },
    { name: ".NET" }
  ]);

  const onSelection = data => {
    const index = selected.findIndex(fn(data));
    if (index === -1) {
      setSelected(s => [...s, data]);
    } else {
      setSelected(s => {
        s.splice(index, 1);
        return [...s];
      });
    }
  };

  const fn = data => s => s.name === data.name;

  const selectedItems = selected.map(s => (
    <div class="chip">
      {/* <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="Person"
        width="96"
        height="96"
      /> */}
      {s.name}
      <span class="closebtn" onClick={() => onSelection(s)}>
        &times;
      </span>
    </div>
  ));

  const listItems = list
    .filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
    .map((data, index) => (
      <div
        className={["text-center", selected.some(fn(data)) ? "selected" : ""]
          .filter(Boolean)
          .join(" ")}
        key={index}
        onClick={() => onSelection(data)}
      >
        {data.name}
      </div>
    ));

  return (
    <>
      <div className="pt-5">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback" />
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            name="search"
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
          />
        </div>
        <div>{selectedItems}</div>
        <div className="grid-container pt-5">{listItems}</div>
      </div>
    </>
  );
}
