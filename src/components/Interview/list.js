import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { interviewActions } from '../../actions';

export default function List({ match }) {
  const { path } = match;
  const dispatch = useDispatch();
  const { interviews = [] } = useSelector(state => state.interview);

  useEffect(() => {
    dispatch(interviewActions.get());
  }, []);
  return (
    <>
      <Link to={`${path}/create`} className="btn btn-sm btn-success m-2">
        Add
      </Link>
      {interviews.map((interview, index) => (
        <li key={index}>{interview.selected.map(s => s.name).join(', ')}</li>
      ))}
    </>
  );
}
