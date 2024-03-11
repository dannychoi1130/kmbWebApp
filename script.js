const api = "https://data.etabus.gov.hk/";
// name

const main = async () => {
  // Step 1: Fetch data
  const res = await fetch(`${api}v1/transport/kmb/route/`);
  const data = await res.json();
  const dataArray = data.data;
  // console.log(dataArray);
  // console.log(dataArray[1560].route);
  // set input
  const button = document.querySelector("button");
  const input = document.querySelector("input");

  const content = document.querySelector(".content");
  const contentContainer = document.querySelector(".contentContainer");
  let inputRoute;
  let buttonClicked = false; // Flag variable to track button click

  button.addEventListener("click", () => {
    const inputRoute = input.value.toUpperCase();
    contentContainer.innerHTML = "";

    for (let i = 0; i < dataArray.length; i++) {
      const dataObj = dataArray[i];
      const route = dataObj.route;
      // console.log(dataObj.orig_tc);

      if (route === inputRoute) {
        // console.log("Match found!");
        // console.log(route);
        // orig and dest button
        const origbutton = document.createElement("button");
        origbutton.textContent = `${dataObj.orig_tc} 去 ${dataObj.dest_tc}`;
        contentContainer.appendChild(origbutton);

        origbutton.addEventListener("click", async () => {
          contentContainer.innerHTML = "";

          const routeDetails = document.createElement("routeDetails");
          // input  Route stops information
          // fetch Route stops
          const resTwo = await fetch(`${api}v1/transport/kmb/route-stop`);
          const dataTwo = await resTwo.json();
          const routeStopArray = dataTwo.data;
          // console.log(routeStopArray);
          const foundroute = routeStopArray.filter(
            (obj) => obj.route === inputRoute
          );
          // console.log(foundroute);
          const stopsidArray = [];
          foundroute.forEach((element) => {
            const stopsIdArray = element.stop;
            stopsidArray.push(stopsIdArray);
          });
          const resThree = await fetch(`${api}v1/transport/kmb/stop`);
          const dataThree = await resThree.json();
          const StopNameArray = dataThree.data;
          console.log(StopNameArray);
          console.log(stopsidArray);
          stopsidArray.forEach((stopId) => {
            const stopObject = StopNameArray.find((obj) => obj.stop === stopId);
            if (stopObject) {
              const stopName = stopObject.name_tc;
              console.log(stopName);
              const stopDetails = document.createElement("p");
              stopDetails.textContent = stopName;
              contentContainer.appendChild(stopDetails);

              // Display the stop name
            }
          });
        });
      }
    }
  });
};

main();

//1) get what user input
//2) validation - check user input
//3) if user input ok=>fetch bus routes=> check if bus rotue exists
//4) if exists => inbound/ outbound routes => create button for users
//5) when route button is being clicked => fetch exact route
//6) Map each bus stop name with the stop id
//7) apppen the data into html
