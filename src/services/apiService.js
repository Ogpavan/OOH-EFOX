import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/base`;
const COMPANY_ID = localStorage.getItem("CompanyID"); // You can make this dynamic if needed

// export const getStateList = async () => {
//   const response = await axios.post(
//     `${BASE_URL}/statelist`,
//     { CompanyId: COMPANY_ID },
//     { headers: { "Content-Type": "application/json" } }
//   );
//   console.log("State List Response:", response.data);
//   return response.data;
// };

// export const getCityListByStateId = async (stateId) => {
//   const response = await axios.post(
//     `${BASE_URL}/CityListByStateId`,
//     { CompanyId: COMPANY_ID, StateId: stateId },
//     { headers: { "Content-Type": "application/json" } }
//   );
//   return response.data;
// };

export const getDesignationList = async () => {
  const response = await axios.post(
    `${BASE_URL}/DesignationList`,
    { CompanyId: COMPANY_ID },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const getDepartmentList = async () => {
  const response = await axios.post(
    `${BASE_URL}/DepartmentList`,
    { CompanyId: COMPANY_ID },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const getGenreList = async () => {
  const response = await axios.post(
    `${BASE_URL}/GenreList`,
    { CompanyId: COMPANY_ID },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const getMediaTypeListByGenreId = async (genreId) => {
  const response = await axios.post(
    `${BASE_URL}/MediaTypeListByGenreId`,
    { CompanyId: COMPANY_ID, GenreId: genreId },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};