


let sendCoordinates = (geoposition) => {
  console.log(geoposition);
  $.ajax({
    type: 'POST',
    url: '/geoposition',
    data: geoposition,
    dataType: 'json',
    success(data) {
      console.log(data);
    },
    error(err) {
      console.log(err);
    }
  });
};

let getCoordinates = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      sendCoordinates(position);
    });
  }
};

module.exports = getCoordinates();