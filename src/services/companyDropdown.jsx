import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const COMPANY_ID = localStorage.getItem("CompanyID");

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Cache to avoid refetching the same data
const cache = {
  companies: null,
};

/**
 * Get the list of client companies
 * @returns {Promise<Array>} Array of company objects
 */
export const getCompanyList = async () => {
  if (cache.companies) return cache.companies;

  try {
    const response = await api.post(`${BASE_URL}/api/base/ClientCompanyList`, { CompanyID: COMPANY_ID });
    cache.companies = response.data;
    return response.data;
  } catch (error) {
    console.error("Error fetching company list:", error);
    throw error;
  }
};

const CompanyDropdown = ({ value, onChange, placeholder = "Select Company" }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true);
      try {
        const list = await getCompanyList();
        setCompanies(list);
      } catch {
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  return (
    <Select value={value} onValueChange={onChange} disabled={loading || companies.length === 0}>
      <SelectTrigger className="w-full border rounded px-2 py-2">
        <SelectValue placeholder={loading ? "Loading..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {companies.map((company) => (
          <SelectItem key={company.ClientCompanyId} value={company.ClientCompanyId.toString()}>
            {company.ClientCompanyName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CompanyDropdown;