import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { interviewActions } from "../../actions";

export default function List() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(interviewActions.get());
  }, []);
  return <>TODO!!</>;
}
