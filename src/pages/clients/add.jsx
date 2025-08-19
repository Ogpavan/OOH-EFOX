import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompanyDropdown from "@/services/companyDropdown.jsx";
import { getStateList, getCityList } from "@/services/stateApi";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Formik, Form, FastField, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { showCustomToast } from "@/customcomponent/CustomToast";

// Validation schema
const validationSchema = Yup.object({
  contactName: Yup.string().max(100, "Max 100 characters").required("Contact name is required"),
  contactMobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid mobile number")
    .required("Mobile number is required"),
  contactEmail: Yup.string().email("Invalid email").max(100, "Max 100 characters"),
  companyId: Yup.string().required("Company is required"),
  designation: Yup.string().max(50, "Max 50 characters"),
  aboutContact: Yup.string().max(200, "Max 200 characters"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  locality: Yup.string().max(100, "Max 100 characters"),
  pincode: Yup.string().matches(/^[0-9]{6}$/, "Enter valid pincode"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().max(200, "Max 200 characters"),
});

export default function AddClient() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    async function fetchStates() {
      console.log("Fetching states...");
      try {
        const data = await getStateList();
        console.log("States API response:", data); // Debug log
        setStates(data);
      } catch (err) {
        console.error("States API error:", err);
        setStates([]);
      }
    }
    fetchStates();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      if (selectedState) {
        try {
          const data = await getCityList(selectedState);
          setCities(data);
        } catch {
          setCities([]);
        }
      } else {
        setCities([]);
      }
    }
    fetchCities();
  }, [selectedState]);

  // API endpoint for inserting contact
  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/client/insertcontact`;

  return (
    <div className="min-h-screen p-8 page-fade-in">
      <h2 className="text-xl font-light tracking-tight mb-6">
        Add{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
          Client
        </span>
      </h2>
      <Formik
        initialValues={{
          contactName: "",
          contactMobile: "",
          contactEmail: "",
          companyId: "",
          designation: "",
          aboutContact: "",
          state: "",
          city: "",
          locality: "",
          pincode: "",
          gender: "",
          address: "",
        }}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const CompanyID = localStorage.getItem("CompanyID");
          const CreatedBY = localStorage.getItem("loginId");
          const payload = {
            CompanyID: CompanyID ? parseInt(CompanyID) : null,
            OrganisationID: values.companyId ? parseInt(values.companyId) : null,
            ContactName: values.contactName,
            ContactPhone: values.contactMobile,
            ContactEmail: values.contactEmail,
            ContactDesignation: values.designation || null,
            ContactState: values.state || null,
            ContactCity: values.city || null,
            ContactLocality: values.locality || null,
            ContactPincode: values.pincode || null,
            ContactAddress: values.address || null,
            CreatedBY: CreatedBY ? parseInt(CreatedBY) : null,
            Gender: values.gender,
          };
          try {
            const response = await axios.post(API_URL, payload);
            const { status, message } = response.data;
            if (status) {
              showCustomToast({ type: "success", message: message || "Contact added successfully!" });
              resetForm();
            } else {
              showCustomToast({ type: "error", message: message || "Failed to add contact." });
            }
          } catch (error) {
            showCustomToast({ type: "error", message: "API Error: " + (error?.message || "Unknown error") });
          }
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Add Contact */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Add Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <FastField name="contactName">
                    {({ field }) => (
                      <Input {...field} placeholder="Contact Name" maxLength={100} />
                    )}
                  </FastField>
                  <ErrorMessage name="contactName" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mobile No <span className="text-red-500">*</span>
                  </label>
                  <FastField name="contactMobile">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Mobile Number"
                        maxLength={10}
                        type="tel"
                        pattern="[0-9]*"
                        onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                      />
                    )}
                  </FastField>
                  <ErrorMessage name="contactMobile" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <FastField name="contactEmail">
                    {({ field }) => (
                      <Input {...field} placeholder="Email" type="email" maxLength={100} />
                    )}
                  </FastField>
                  <ErrorMessage name="contactEmail" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company <span className="text-red-500">*</span></label>
                  <FastField name="companyId">
                    {({ field }) => (
                      <CompanyDropdown
                        value={field.value}
                        onChange={value => setFieldValue("companyId", value)}
                        placeholder="--Select Company--"
                      />
                    )}
                  </FastField>
                  <ErrorMessage name="companyId" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Designation</label>
                  <FastField name="designation">
                    {({ field }) => (
                      <Input {...field} placeholder="Designation" maxLength={50} />
                    )}
                  </FastField>
                  <ErrorMessage name="designation" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">About Contact</label>
                  <FastField name="aboutContact">
                    {({ field }) => (
                      <Input {...field} placeholder="About Contact" maxLength={200} />
                    )}
                  </FastField>
                  <ErrorMessage name="aboutContact" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
            </section>

            {/* Address Details */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Address Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* State Dropdown */}
                <div>
                  <label className="block text-sm font-medium mb-1">State <span className="text-red-500">*</span></label>
                  {states.length === 0 ? (
                    <div className="flex items-center gap-2 text-gray-500 text-sm py-2">
                      <span className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full"></span>
                      Loading states...
                    </div>
                  ) : (
                    <FastField name="state">
                      {({ field, form }) => (
                        <Select
                          value={field.value}
                          onValueChange={value => {
                            form.setFieldValue("state", value);
                            setSelectedState(value);
                            form.setFieldValue("city", "");
                          }}
                        >
                          <SelectTrigger className="w-full border rounded px-2 py-2">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state.StateId} value={state.StateId.toString()}>
                                {state.StateName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FastField>
                  )}
                  <ErrorMessage name="state" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* City Dropdown */}
                <div>
                  <label className="block text-sm font-medium mb-1">City <span className="text-red-500">*</span></label>
                  {!values.state ? (
                    <Select disabled>
                      <SelectTrigger className="w-full border rounded px-2 py-2 bg-gray-100 cursor-not-allowed">
                        <SelectValue placeholder="Select state first" />
                      </SelectTrigger>
                      <SelectContent />
                    </Select>
                  ) : cities.length === 0 ? (
                    <Select disabled>
                      <SelectTrigger className="w-full border rounded px-2 py-2 bg-gray-100 cursor-not-allowed">
                        <SelectValue placeholder="Loading cities..." />
                      </SelectTrigger>
                      <SelectContent />
                    </Select>
                  ) : (
                    <FastField name="city">
                      {({ field, form }) => (
                        <Select
                          value={field.value}
                          onValueChange={value => form.setFieldValue("city", value)}
                        >
                          <SelectTrigger className="w-full border rounded px-2 py-2">
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city.CityId} value={city.CityId.toString()}>
                                {city.CityName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </FastField>
                  )}
                  <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Locality */}
                <div>
                  <label className="block text-sm font-medium mb-1">Locality</label>
                  <FastField name="locality">
                    {({ field }) => (
                      <Input {...field} placeholder="Locality" maxLength={100} />
                    )}
                  </FastField>
                  <ErrorMessage name="locality" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode</label>
                  <FastField name="pincode">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Pincode"
                        maxLength={6}
                        type="tel"
                        pattern="[0-9]*"
                        onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                      />
                    )}
                  </FastField>
                  <ErrorMessage name="pincode" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              {/* Second row: Birth Date, Anniversary Date, Address */}
              <div className="flex items-center gap-4">
                     <div className="flex items-center gap-4">
              <div className="min-w-40">
                <label className="block text-sm font-medium mb-1">Gender <span className="text-red-500">*</span></label>
                <FastField name="gender">
                  {({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={value => setFieldValue("gender", value)}
                    >
                      <SelectTrigger className="w-full border rounded px-2 py-2">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </FastField>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <FastField name="address">
                    {({ field }) => (
                      <Input {...field} placeholder="Address" maxLength={200} />
                    )}
                  </FastField>
                  <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
            </section>

            {/* Gender Dropdown */}
       

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
