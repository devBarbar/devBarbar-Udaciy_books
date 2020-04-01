import React from "react";
import useGlobalHook from "../hooks";

import * as actions from "../actions";

const initialState = {
  books: null
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
