import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Steps, Step } from "react-step-builder";

import { authActions } from "../../actions";

import "./Home.css";

const Navigation = props => {
  console.log("Navigation");
  console.log({ props });

  const { state, current, size } = props;

  const isInvalidSelected = !state.selected?.length;

  return (
    <div>
      {current !== size ? (
        <button
          onClick={props.next}
          disabled={isInvalidSelected}
          className="btn btn-primary"
        >
          Next
        </button>
      ) : null}
    </div>
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
  const [selected, setSelected] = useState(props.state?.selected || []);

  useEffect(() => {
    props.setState("selected", [...selected]);
  }, [selected]);

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
    <div className="chip" key={index}>
      {/* <img src="https://www.w3schools.com/howto/img_avatar.png" /> */}
      {s.name}
      <span className="closebtn" onClick={() => onSelection(s)}>
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
        value={props.getState("name", "aa")}
        onChange={props.handleChange}
      />
    </>
  );
};

const FinalStep = props => {
  console.log({ props });
  const handleSubmit = () => console.log(props);
  return (
    <div>
      <b>Data:</b> {props.state.name}
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const Before = props => {
  return (
    <div>
      {props.current !== 1 ? <button onClick={props.prev}>Back</button> : null}
    </div>
  );
};

const After = props => {
  return <></>;
};

export default function Home() {
  const config = {
    before: Before, // a React component with special props provided automatically
    after: After, // a React component with special props provided automatically
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
