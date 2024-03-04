class SaveParams {
  constructor(data, onSuccess = null, onFailure = null) {
    this.data = data;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
  }
}

export default SaveParams;
