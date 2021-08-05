import API from "./api_url";

async function getTheaterNames() {
  return API.request(`theaters/theater_names`);
}

async function updateServerTheater(theater) {
  return API.put(`theaters/${theater.id}`, {
    id: theater.id,
    theater: theater,
  });
}

export { getTheaterNames, updateServerTheater };
