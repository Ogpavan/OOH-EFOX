import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Building2, User, Phone, Mail, MapPin, Calendar, UserCheck } from "lucide-react";

// Dummy data (should come from API or context in real app)
const companies = [
	{
		id: 1,
		name: "Acme Corp",
		phone: "9876543210",
		email: "info@acme.com",
		address: "123 Main St",
		state: "Uttar Pradesh",
		city: "Lucknow",
		locality: "Hazratganj",
		masterContact: {
			name: "Rahul Sharma",
			designation: "Admin",
			phone: "6396452547",
			email: "trishna@inventive.in",
			industry: "home service",
			createdOn: "30 Aug 2023",
			createdBy: "Praveen",
		},
		contacts: [
			{
				name: "Rahul Sharma",
				phone: "6396452547",
				email: "trishna@inventive.in",
				address: "123 Main St",
				locality: "Hazratganj",
				state: "Uttar Pradesh",
				city: "Lucknow",
				generationDate: "22 Sep 2023",
				createdBy: "Praveen",
			},
			{
				name: "Priya Verma",
				phone: "9876543211",
				email: "priya@acme.com",
				address: "123 Main St",
				locality: "Hazratganj",
				state: "Uttar Pradesh",
				city: "Lucknow",
				generationDate: "25 Sep 2023",
				createdBy: "Admin",
			},
		],
	},
	{
		id: 2,
		name: "Globex Ltd",
		phone: "9123456789",
		email: "contact@globex.com",
		address: "456 Market Rd",
		state: "Delhi",
		city: "Delhi",
		locality: "Connaught Place",
		masterContact: {
			name: "Yash",
			designation: "Manager",
			phone: "9123456789",
			email: "yash@globex.com",
			industry: "IT",
			createdOn: "15 Jul 2025",
			createdBy: "Admin",
		},
		contacts: [
			{
				name: "Yash",
				phone: "9123456789",
				email: "yash@globex.com",
				address: "456 Market Rd",
				locality: "Connaught Place",
				state: "Delhi",
				city: "Delhi",
				generationDate: "15 Jul 2025",
				createdBy: "Admin",
			},
		],
	},
];

export default function ViewClient() {
    const { id } = useParams();
    const client = companies.find((c) => c.id === Number(id)) || companies[0]; // Default to first client for demo

    if (!client) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Card className="p-8">
                    <h2 className="text-xl font-semibold mb-2">Client Details</h2>
                    <div className="text-red-500">Client not found.</div>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col   page-fade-in">
            {/* Header */}
            <div className="px-6 py-4  ">
                <h2 className="text-xl tracking-tight">
                    View{" "}
                    <span className="font-bold text-2xl" style={{ color: "#EC5800" }}>
                        Client
                    </span>
                </h2>
            </div>

            {/* Main Content - Scrollable */}
            <div className="flex-1 overflow-auto p-6">
                {/* Top Cards Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                    {/*  Client Details Card */}
                    <Card className="p-6   transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-orange-600" />
                                <h3 className="text-lg font-semibold"> Client Details</h3>
                            </div>
                            <Button variant="outline" size="sm" className="hover:bg-orange-50">
                                Edit
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider"> Client Name</span>
                                    <span className="font-semibold text-gray-900">{ client.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Phone</span>
                                    <span className="text-gray-700">{ client.phone}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Email</span>
                                    <span className="text-gray-700">{ client.email}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Address</span>
                                    <span className="text-gray-700">{ client.address}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Location</span>
                                    <span className="text-gray-700">
                                        { client.locality}, { client.city}
                                    </span>
                                    <span className="text-gray-600 text-sm">{ client.state}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Master Contact Card */}
                    <Card className="p-6   transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="h-5 w-5 text-orange-600" />
                            <h3 className="text-lg font-semibold">Master Contact</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Name</span>
                                    <span className="font-semibold text-gray-900">{ client.masterContact.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Designation</span>
                                    <span className="text-gray-700">{ client.masterContact.designation}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Industry</span>
                                    <span className="text-gray-700 capitalize">{ client.masterContact.industry}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Contact</span>
                                    <span className="text-gray-700">{ client.masterContact.phone}</span>
                                    <span className="text-gray-600 text-sm">{ client.masterContact.email}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">Created</span>
                                    {/* <span className="text-gray-700">{ Client.masterContact.createdOn}</span> */}
                                    <span className="text-gray-600 text-sm">by { client.masterContact.createdBy}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Contacts Table */}
                <Card className="p-6   transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5 text-orange-600" />
                            <h3 className="text-lg font-semibold">All Contacts</h3>
                            <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                                { client.contacts.length} contacts
                            </span>
                        </div>
                    </div>
                    
                    {/* Responsive Table Container */}
                    <div className="overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold text-gray-700 w-12">S.No</TableHead>
                                    <TableHead className="font-semibold text-gray-700 min-w-[150px]">Name</TableHead>
                                    <TableHead className="font-semibold text-gray-700 min-w-[120px]">Phone</TableHead>
                                    <TableHead className="font-semibold text-gray-700 min-w-[200px]">Email</TableHead>
                                    <TableHead className="font-semibold text-gray-700 min-w-[200px]">Address</TableHead>
                                    <TableHead className="font-semibold text-gray-700 min-w-[150px]">Location</TableHead>
                                    {/* <TableHead className="font-semibold text-gray-700 min-w-[120px]">Created</TableHead> */}
                                    <TableHead className="font-semibold text-gray-700 min-w-[100px]">By</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                { client.contacts.map((contact, idx) => (
                                    <TableRow key={idx} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="font-medium">{idx + 1}</TableCell>
                                        <TableCell className="font-semibold">{contact.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Phone className="h-3 w-3 text-gray-400" />
                                                {contact.phone}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Mail className="h-3 w-3 text-gray-400" />
                                                <span className="text-sm">{contact.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{contact.address}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{contact.locality}</div>
                                                <div className="text-gray-500">{contact.city}, {contact.state}</div>
                                            </div>
                                        </TableCell>
                                        {/* <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3 text-gray-400" />
                                                <span className="text-sm">{contact.generationDate}</span>
                                            </div>
                                        </TableCell> */}
                                        <TableCell>{contact.createdBy}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Empty State */}
                    { client.contacts.length === 0 && (
                        <div className="text-center py-12">
                            <UserCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No contacts found</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}