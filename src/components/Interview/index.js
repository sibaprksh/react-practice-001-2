import List from "./list";
import Create from "./create";

export { List as Interviews };
export { Create as CreateInterview };

// https://jasonwatmore.com/post/2020/10/09/react-crud-example-with-react-hook-form
import React from "react";
import { Route, Switch } from "react-router-dom";

import { List } from "./List";
import { AddEdit } from "./AddEdit";

function Users({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={List} />
      <Route path={`${path}/add`} component={AddEdit} />
      <Route path={`${path}/edit/:id`} component={AddEdit} />
    </Switch>
  );
}

export { Users };
