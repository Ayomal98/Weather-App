window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temprature-description");
  let tempDegree = document.querySelector(".temprature-degree");
  let locationTimeZone = document.querySelector(".location-timezone");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((response) => {
          console.log(response);
          const { apparentTemperature, summary, icon } = response.currently;
          tempDegree.textContent = apparentTemperature;
          tempDescription.textContent = summary;
          locationTimeZone.textContent = response.timezone;
          setIcons(icon, document.getElementById("icon"));
        });
    });
  }
  function setIcons(icon, iconid) {
    const skycons = new Skycons({ color: "White" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconid, Skycons[currentIcon]);
  }
});
