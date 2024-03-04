class LoadParams {
  constructor(fetchParams = {}, onSuccess = null, onFailure = null) {
    this.fetchParams = fetchParams;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
  }
}

export default LoadParams;
