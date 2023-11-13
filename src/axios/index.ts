export const getAllOligarchs = {
  method: "GET",
  url: "https://localhost:3000/",
  params: {
    page: "0",
    size: "100",
    countryOfCitizenship: "ukraine",
  },
  headers: {
    "X-RapidAPI-Key": "d1cce8013emshed7a4122aab710bp174c77jsn70c983dd0b05",
    "X-RapidAPI-Host": "forbes-worlds-billionaires-list.p.rapidapi.com",
  },
};
