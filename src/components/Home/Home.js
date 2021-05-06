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
  props.jump(2); // jump to step

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
        <div className="grid-container pt-5 pb-5">{listItems}</div>
      </div>
    </>
  );
};

const TimeStep = props => {
  const defaultSlot = { date: "", "start-time": "", "end-time": "" };
  const [slots, setSlots] = useState([defaultSlot]);

  return (
    <>
      {/* First Name
      <input
        type="text"
        name="name"
        value={props.getState("name", "aa")}
        onChange={props.handleChange}
      /> */}
      {slots.map((slot, index) => {
        return (
          <div className="slot-container pb-2 pt-2">
            <input
              type="date"
              placeholder="Date"
              name="date"
              value={slot.date}
              className="form-control"
            />
            <input
              type="time"
              name="start-time"
              value={slot["start-time"]}
              className="form-control"
            />
            <input
              type="time"
              name="end-time"
              value={slot["end-time"]}
              className="form-control"
            />
            {slots.length != 1 ? (
              <button
                className="btn btn-danger"
                onClick={() =>
                  setSlots(s => {
                    s.splice(index, 1);
                    return [...s];
                  })
                }
              >
                Remove
              </button>
            ) : null}
          </div>
        );
      })}

      <button
        className="mb-2 btn btn-primary"
        onClick={() => setSlots(s => [...s, defaultSlot])}
      >
        Add
      </button>
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
    before: Before,
    after: After,
    navigation: {
      component: Navigation,
      location: "after"
    }
  };

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
