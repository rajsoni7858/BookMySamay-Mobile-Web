import {ROUTE} from '../action-types';

// SAVE
export const saveInitialRoute = params => ({
  type: ROUTE.SAVE,
  params,
});

export const saveInitialRouteSucceeded = data => ({
  type: ROUTE.SAVE_SUCCEEDED,
  data,
});

export const saveInitialRouteFailed = error => ({
  type: ROUTE.SAVE_FAILED,
  error,
});
