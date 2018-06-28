import _ from "lodash";

import { LIKE_JOB, CLEAR_LIKED_JOBS } from "../actions/types";

const initialState = {
  jobs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIKE_JOB:
      mergedJobs = _.uniqBy([action.payload, ...state.jobs], "jobkey");
      return {
        ...state,
        jobs: mergedJobs
      };
      break;
    case CLEAR_LIKED_JOBS:
      return {
        ...state,
        jobs: []
      };

    default:
      return state;
      break;
  }
};
