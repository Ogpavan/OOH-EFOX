import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/base`;
const COMPANY_ID = localStorage.getItem("CompanyID");

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Cache to avoid refetching the same data
const cache = {
  states: null,
  cities: {},
};

/**
 * Get the list of states
 * @returns {Promise<Array>} Array of state objects
 */
export const getStateList = async () => {
  // Return cached states if available
  if (cache.states) return cache.states;

  try {
    const response = await api.post("/statelist", { CompanyId: COMPANY_ID });
    cache.states = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching state list:", error);
    throw error;
  }
};

/**
 * Get the list of cities for a given state
 * @param {number|string} stateId - StateId from API
 * @returns {Promise<Array>} Array of city objects
 */
export const getCityList = async (stateId) => {
  if (cache.cities[stateId]) return cache.cities[stateId];

  try {
    const response = await api.post("/CityListByStateId", { StateId: stateId, CompanyId: COMPANY_ID });
    cache.cities[stateId] = response.data;
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for state ${stateId}:`, error);
    throw error;
  }
};
