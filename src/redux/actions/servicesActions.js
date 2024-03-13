import { SERVICES } from "../action-types";

// LOAD
export const loadServices = (params) => ({
  type: SERVICES.LOAD,
  params,
});

export const loadServicesSucceeded = (data) => ({
  type: SERVICES.LOAD_SUCCEEDED,
  data,
});

export const loadServicesFailed = (error) => ({
  type: SERVICES.LOAD_FAILED,
  error,
});

// UPDATE SERVICES
export const updateServices = (params) => ({
  type: SERVICES.UPDATE,
  params,
});

export const updateServicesSucceeded = (data) => ({
  type: SERVICES.UPDATE_SUCCEEDED,
  data,
});

export const updateServicesFailed = (error) => ({
  type: SERVICES.UPDATE_FAILED,
  error,
});

// SAVE SERVICE
export const saveService = (data) => ({
  type: SERVICES.SAVE,
  data,
});
