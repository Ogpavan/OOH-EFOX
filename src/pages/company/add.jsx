import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Formik, Form, FastField, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showCustomToast } from "@/customcomponent/CustomToast";
import { getStateList, getCityListByStateId } from "@/services/apiService";

// Validation schema
const validationSchema = Yup.object({
  companyName: Yup.string().max(100, "Max 100 characters").required("Company name is required"),
  companyMobile: Yup.string().max(15, "Max 15 digits").required("Mobile number is required"),
  companyEmail: Yup.string().email("Invalid email").max(100, "Max 100 characters"),
  contactName: Yup.string().max(100, "Max 100 characters").required("Contact name is required"),
  contactMobile: Yup.string().max(15, "Max 15 digits").required("Contact mobile is required"),
  contactEmail: Yup.string().email("Invalid email").max(100, "Max 100 characters"),
  state: Yup.string().max(50, "Max 50 characters").required("State is required"),
  city: Yup.string().max(50, "Max 50 characters").required("City is required"),
  locality: Yup.string().max(100, "Max 100 characters"),
  pincode: Yup.string().max(10, "Max 10 characters"),
  address: Yup.string().max(200, "Max 200 characters"),
  pan: Yup.string().max(10, "Max 10 characters"),
  gst: Yup.string().max(15, "Max 15 characters"),
  designation: Yup.string().max(50, "Max 50 characters"),
  aboutCompany: Yup.string().max(200, "Max 200 characters"),
  aboutContact: Yup.string().max(200, "Max 200 characters"),
});

export default function AddCompany() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("");

  useEffect(() => {
    async function fetchStates() {
      try {
        const data = await getStateList();
        setStates(data);
        // Debug: log type and value of states
        console.log("Type of states:", typeof data, "Is Array:", Array.isArray(data), data);
      } catch (error) {
        setStates([]);
      }
    }
    fetchStates();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      if (selectedStateId) {
        try {
          const data = await getCityListByStateId(selectedStateId);
          console.log("Cities Data:", data);
          setCities(data);
        } catch (error) {
          setCities([]);
        }
      } else {
        setCities([]);
      }
    }
    fetchCities();
  }, [selectedStateId]);

  return (
    <div className="min-h-screen p-8 page-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-light tracking-tight">
            Add{" "}
            <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
              Company
            </span>
          </h2>
        </div>
        <Link to="/company/manage">
          <Button className="bg-blue-500 text-white">Manage Company</Button>
        </Link>
      </div>

      <Formik
        initialValues={{
          companyName: "",
          companyMobile: "",
          companyEmail: "",
          aboutCompany: "",
          state: "",
          city: "",
          locality: "",
          pincode: "",
          address: "",
          pan: "",
          gst: "",
          contactName: "",
          contactMobile: "",
          contactEmail: "",
          designation: "",
          aboutContact: "",
        }}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={(values) => {
          showCustomToast({ type: "success", message: "Company Added Successfully" });
          // handle submit

          console.log(values);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-6">
            {/* Company Information */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <FastField name="companyName">
                    {({ field }) => (
                      <Input {...field} placeholder="Company Name" maxLength={100} />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="companyName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mobile No <span className="text-red-500">*</span>
                  </label>
                  <FastField name="companyMobile">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="12 digits Mobile Number"
                        maxLength={12}
                        type="tel"
                        pattern="[0-9]*"
                        onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                      />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="companyMobile"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <FastField name="companyEmail">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Email"
                        type="email"
                        maxLength={100}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="companyEmail"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    About Company
                  </label>
                  <FastField name="aboutCompany">
                    {({ field }) => (
                      <Input {...field} placeholder="About Company" maxLength={200} />
                    )}
                  </FastField>
                </div>
              </div>
            </section>

            {/* Address Details */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Address Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <FastField name="state">
                    {({ field, form }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          form.setFieldValue("state", value);
                          setSelectedStateId(value);
                          form.setFieldValue("city", ""); // Reset city when state changes
                        }}
                      >
                        <SelectTrigger className="w-full border rounded px-2 py-2">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.length > 0 ? (
                            states.map((state) => (
                              <SelectItem key={state.StateId} value={state.StateId.toString()}>
                                {state.StateName}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="loading" disabled>
                              Loading states...
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </FastField>
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <FastField name="city">
                    {({ field, form }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          form.setFieldValue("city", value);
                          console.log("Selected StateId:", selectedStateId);
                          console.log("Selected CityId:", value);
                        }}
                        disabled={!selectedStateId}
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
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Locality</label>
                  <FastField name="locality">
                    {({ field }) => (
                      <Input {...field} placeholder="Locality" maxLength={100} />
                    )}
                  </FastField>
                </div>
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
                </div>
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <FastField name="address">
                    {({ field }) => (
                      <Input {...field} placeholder="Address" maxLength={200} />
                    )}
                  </FastField>
                </div>
              </div>
            </section>

            {/* Company Identity */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Company Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    PAN Card No.
                  </label>
                  <FastField name="pan">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="PAN Card Number"
                        maxLength={10}
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        style={{ textTransform: "uppercase" }}
                        onInput={e => e.target.value = e.target.value.replace(/[^A-Z0-9]/gi, '').toUpperCase()}
                      />
                    )}
                  </FastField>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GST No.</label>
                  <FastField name="gst">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="GST Number"
                        maxLength={15}
                        style={{ textTransform: "uppercase" }}
                        onInput={e => e.target.value = e.target.value.replace(/[^A-Z0-9]/gi, '').toUpperCase()}
                      />
                    )}
                  </FastField>
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <FastField name="contactName">
                    {({ field }) => (
                      <Input {...field} placeholder="Contact Name" />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="contactName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mobile No <span className="text-red-500">*</span>
                  </label>
                  <FastField name="contactMobile">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="12 digits Mobile Number"
                        maxLength={12}
                        type="tel"
                        pattern="[0-9]*"
                        onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                      />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="contactMobile"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <FastField name="contactEmail">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Contact Email"
                        type="email"
                        maxLength={100}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="contactEmail"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Designation</label>
                  <FastField name="designation">
                    {({ field }) => (
                      <Input {...field} placeholder="Designation" maxLength={50} />
                    )}
                  </FastField>
                </div>
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium mb-1">
                    About Contact
                  </label>
                  <FastField name="aboutContact">
                    {({ field }) => (
                      <Input {...field} placeholder="About Contact" maxLength={200} />
                    )}
                  </FastField>
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
