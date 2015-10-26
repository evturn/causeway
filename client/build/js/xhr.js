module.exports = {
  post(options={}) {
    $.ajax({
      url: options.url,
      type: 'POST',
      data: options.data,
      dataType: options.dataType,
      success(data) {
        options.callback(data);
      },
      error(err) {
        console.log(err);
      }
    });
  },
  get(options={}) {
    $.ajax({
      url: options.url,
      type: 'GET',
      data: options.data,
      success(data) {
        options.callback(data);
      },
      error(err) {
        console.log(err);
      }
    });
  }
};
