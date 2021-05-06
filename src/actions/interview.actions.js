import { alertActions } from "./";

export const interviewActions = {
  create
};

function create(data, history) {
  return async dispatch => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    return fetch(`${host}/interviews`, requestOptions)
      .then(handleResponse)
      .then(data => {
        dispatch(alertActions.success("Inerview request created!"));
        history.push("/login");
      });
  };
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
