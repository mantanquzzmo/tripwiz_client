const sliderChoice = event => {
  Array.from(
    document.getElementsByClassName(`range-values-${event.target.name}`)[0]
      .children
  ).forEach(div => (div.style.color = "black"));
  let divId = `${event.target.name}${event.target.value}`;
  if (event.target.name === "hotel") {
    document.getElementById(divId).style.color = "gold";
  } else if (event.target.name === "food") {
    document.getElementById(divId).style.color = "green";
  } else {
    document.getElementById(divId).style.color = "blue";
  }
};

export { sliderChoice };
