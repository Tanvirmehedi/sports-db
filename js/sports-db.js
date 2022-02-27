const getAllSports = async () => {
  const baseUrl = `https://www.thesportsdb.com/api/v1/json/2/all_sports.php`;
  try {
    const request = await fetch(baseUrl);
    const sportsData = await request.json();
    displayData(sportsData.sports);
  } catch (err) {
    console.log(err);
  }
};

const displayData = (data) => {
  const gridBox = document.getElementById("sports-grid-box");
  for (const items of data) {
    const {
      idSport,
      strFormat,
      strSport,
      strSportDescription,
      strSportIconGreen,
      strSportThumb,
    } = items;
    if (strSportThumb) {
      const img = `https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png`;
      // End Of Variable
      const div = document.createElement("div");
      div.innerHTML = `<div  class="border  rounded-md bg-slate-800 text-slate-300">
    <img src="${
      strSportThumb ? strSportThumb : img
    }" alt="${strFormat}" class="w-full rounded-lg" />
        <div class="px-4 py-2">
            <h1>Sports Id: ${idSport}</h1>
            <p>${strSport}</p>
            <span>Sports Format: ${strFormat}
            <img src="${strSportIconGreen}" class="inline-block w-10 ml-2 bg-white rounded-full p-1 drop-shadow-2xl border-4 border-slate-500" alt="${idSport}" /></span>
            <p>${
              strSportDescription.length >= 100
                ? strSportDescription.slice(0, 100)
                : strSportDescription
            }...</p>
            <a href="#" class="inline-block mt-3 text-white border px-4 py-1 bg-black  rounded-md font-semibold">Details</a> 
        </div>
    </div>`;
      gridBox.appendChild(div);
    }
  }
};
getAllSports();

// Fetch Search By Name Function
const searchPlayer = async () => {
  const ValueBox = searchBox();
  if (ValueBox === undefined) {
    alert("No Data Found");
  } else {
    try {
      const baseUrl = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${ValueBox}`;
      const request = await fetch(baseUrl);
      const data = await request.json();
      displaySearchPlayer(data.player);
    } catch (err) {
      alert(err);
    }
  }
};

// Search Box Validation
const searchBox = () => {
  const searchBox = document.getElementById("search-box");
  const searchValue = searchBox.value;
  const Text = parseFloat(searchValue);
  if (searchValue === "") {
    alert("Dont Type The Text Box Blank");
    searchBox.value = "";
  } else if (Text <= 0 || Text >= 0) {
    alert("Dont Type The Text Box Number");
    searchBox.value = "";
  } else if (/[^a-zA-Z0-9\-\/]/.test(searchValue)) {
    alert("Dont Type The Text Box Sepcial Carecters");
    searchBox.value = "";
  } else {
    searchBox.value = "";
    return searchValue;
  }
};

// Display Search player

const displaySearchPlayer = (data) => {
  const classArr = [
    "my-2",
    "border",
    "grid",
    "grid-cols-2",
    "mx-auto",
    "gap-3",
  ];
  document.getElementById("display-sports").style.display = "none";
  const displayPlayer = document.getElementById("display-player");
  const displayGrid = document.getElementById("player-grid-box");
  displayGrid.innerText = "";
  displayPlayer.classList.remove("hidden");
  for (const items of data) {
    if (items.strThumb) {
      const div = document.createElement("div");
      div.classList.add(...classArr);
      div.innerHTML = `
    <div class="p-3 drop-shadow-xl flex items-center justify-center">
        <img src="${
          items.strThumb ? items.strThumb : ""
        }" class="rounded-md" alt="${items.strPlayer}" />
    </div>
    <div class="p-3 ">
         <h1 class="bg-slate-400 px-2 rounded-md">Player Name: <span class="text-slate-50">${
           items.strPlayer
         }</span></h1>
         <h2>Nationality: ${items.strNationality}</h2>
         <h2>Gender: ${items.strGender}</h2>
         <h2 class="bg-slate-400 px-2 rounded-md"><span class="text-slate-50">Position:</span> ${
           items.strPosition
         }</h2>
         <h2>Sports: ${items.strSport}</h2>
         <button class="mt-2 font-bold rounded-md border text-white bg-slate-800 px-2 py-1" onclick="getById(${
           items.idPlayer
         })">Details</button>
         <button class="mt-2 font-bold rounded-md border text-white bg-rose-600 px-2 py-1">Delete</button>
    </div>
    `;
      displayGrid.appendChild(div);
    }
  }
};

const getById = async (data) => {
  const baseUrl = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${data}`;
  const request = await fetch(baseUrl);
  const playerDetails = await request.json();
  displaySinglePlayer(playerDetails.players[0]);
};

const displaySinglePlayer = (player) => {
  const sweetPopUpBox = document.getElementById("sweet-popup-box");
  sweetPopUpBox.innerText = "";
  document.getElementById("singla-player").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="relative">
    <span id="close-it"class="cursor-pointer absolute top-3 text-2xl text-red-600 right-5 z-50">X</span>
  </div>
    <h1 class="rounded-lg text-center bg-slate-500 text-slate-50 text-lg font-bold ">Name: ${
      player.strPlayer
    }</h1>
    <div class="p-4 text-center "><img class="mx-auto rounded-md" src="${
      player.strCutout ? player.strCutout : player.strThumb
    }" alt="${player.strPlayer}" /></div>
    <div class="py-5 px-4 text-lg">
        <h2>Born ${player.dateBorn}</h2>
        <h2>BirthLocation: ${player.strBirthLocation}</h2>
        <h2>Nationality: ${player.strNationality}</h2>
        <h2>Sport: ${player.strSport}</h2>
        <h2>Position: ${player.strPosition}</h2>
        <h2>Team: ${player.strTeam}</h2>
        <h2>Weight: ${player.strWeight}</h2>
    </div>
  `;
  sweetPopUpBox.appendChild(div);
};

// Close It Button
document.getElementById("sweet-popup-box").addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "close-it") {
    document.getElementById("singla-player").classList.add("hidden");
    document.body.style.overflow = "auto";
  }
});
