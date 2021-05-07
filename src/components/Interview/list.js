import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { interviewActions } from '../../actions';

export default function List({ match }) {
  const { path } = match;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(interviewActions.get());
  }, []);
  return (
    <>
      <Link to={`${path}/create`} className="btn btn-sm btn-success m-2">
        Add
      </Link>
    </>
  );
}
