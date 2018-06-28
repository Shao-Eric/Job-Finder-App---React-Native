import JOB_DATA from './IndeedJobData.json';

import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types';
export const fetchJobs = (region, callback) => async dispatch => {
  try {
    const data = JOB_DATA;

    dispatch({ type: FETCH_JOBS, payload: data });
    console.log(data);
    callback();
  } catch (e) {
    console.log(e);
  }
};

export const likeJob = job => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
