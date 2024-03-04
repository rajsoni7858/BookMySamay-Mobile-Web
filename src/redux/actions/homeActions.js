import {HOME} from '../action-types';

// LOAD
export const loadHome = params => ({
  type: HOME.LOAD,
  params,
});

export const loadHomeSucceeded = data => ({
  type: HOME.LOAD_SUCCEEDED,
  data,
});

export const loadHomeFailed = error => ({
  type: HOME.LOAD_FAILED,
  error,
});
