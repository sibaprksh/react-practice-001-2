import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Steps, Step } from "react-step-builder";

import { authActions } from "../../actions";

import "./Home.css";

const Navigation = props => {
  console.log({ props });
  return (
    <>
      <button type="button" onClick={props.prev} style={{ marginRight: 10 }}>
        Previous
      </button>
      <button type="button" onClick={props.next}>
        Next
      </button>
    </>
  );
};

const SelectStep = props => {
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
    { name: ".NET" },
    { name: ".NET MVC" },
    { name: "AI" },
    { name: "Spark" }
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

  const selectedItems = selected.map((s, index) => (
    <div class="chip" key={index}>
      {/* <img src="https://www.w3schools.com/howto/img_avatar.png" /> */}
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
        className={[
          "text-center",
          "box",
          selected.some(fn(data)) ? "selected" : ""
        ]
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
      <div className="pt-5 pb-5">
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
        <div className="grid-container pt-5 pb-5">{listItems}</div>
      </div>
    </>
  );
};

const TimeStep = props => {
  return (
    <>
      First Name
      <input
        type="text"
        name="name"
        value={props.getState("name", "")}
        onChange={props.handleChange}
      />
    </>
  );
};

const FinalStep = props => {
  const handleSubmit = () => alert("submit: TODO!");
  return (
    <div>
      <b>Name:</b> {props.state.name}
    </div>
  );
};

export default function Home() {
  //const FINAL_STAGE = 2;
  //const [stage, setStage] = useState(1);

  const config = {
    navigation: {
      component: Navigation,
      location: "after"
    }
  };
  // https://codesandbox.io/s/react-step-builder-demo-j55cn?from-embed=&file=/src/FinalStep.js
  return (
    <>
      <div className="pt-5 pb-5">
        <Steps config={config}>
          <Step component={SelectStep} />
          <Step component={TimeStep} />
          <Step component={FinalStep} />
        </Steps>
      </div>
    </>
  );
}
