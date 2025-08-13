import React from "react";
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

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().max(100, "Max 100 characters").required("Name is required"),
  email: Yup.string().email("Invalid email").max(100, "Max 100 characters"),
  phone: Yup.string().max(15, "Max 15 digits").required("Phone is required"),
  source: Yup.string().required("Lead source is required"),
  assignedTo: Yup.string().max(100, "Max 100 characters"),
  tags: Yup.string().max(100, "Max 100 characters"),
  priority: Yup.string().required("Priority is required"),
  notes: Yup.string().max(200, "Max 200 characters"),
});

export default function AddLead() {
  return (
    <div className="min-h-screen p-8 page-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-light tracking-tight">
            Add{" "}
            <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
              Lead
            </span>
          </h2>
        </div>
        <Link to="/leads/list">
          <Button className="bg-blue-500 text-white">Lead List</Button>
        </Link>
      </div>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          source: "",
          assignedTo: "",
          tags: "",
          priority: "",
          notes: "",
        }}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={(values) => {
          // handle submit
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            {/* Lead Information */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Lead Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <FastField name="name">
                    {({ field }) => (
                      <Input {...field} placeholder="Lead Name" maxLength={100} />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <FastField name="email">
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
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <FastField name="phone">
                    {({ field }) => (
                      <Input
                        {...field}
                        placeholder="Phone"
                        maxLength={15}
                        type="tel"
                        pattern="[0-9]*"
                        onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                      />
                    )}
                  </FastField>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Lead Source <span className="text-red-500">*</span>
                  </label>
                  <FastField name="source">
                    {({ field, form }) => (
                      <Select
                        value={field.value}
                        onValueChange={value => form.setFieldValue("source", value)}
                      >
                        <SelectTrigger className="w-full border rounded px-2 py-2">
                          <SelectValue placeholder="Select Source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="Event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </FastField>
                  <ErrorMessage
                    name="source"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>
            </section>

            {/* Assignment & Tags */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Assignment & Tags</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Assigned To</label>
                  <FastField name="assignedTo">
                    {({ field }) => (
                      <Input {...field} placeholder="Staff Name" maxLength={100} />
                    )}
                  </FastField>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tags</label>
                  <FastField name="tags">
                    {({ field }) => (
                      <Input {...field} placeholder="Tags" maxLength={100} />
                    )}
                  </FastField>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <FastField name="priority">
                    {({ field, form }) => (
                      <Select
                        value={field.value}
                        onValueChange={value => form.setFieldValue("priority", value)}
                      >
                        <SelectTrigger className="w-full border rounded px-2 py-2">
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </FastField>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <FastField name="notes">
                    {({ field }) => (
                      <Input {...field} placeholder="Notes" maxLength={200} />
                    )}
                  </FastField>
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <Button type="submit" className="bg-orange-600 text-white">Save Lead</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}