import React from "react";
import { MdTableChart, MdPerson, MdDashboard, MdHandshake, MdPublic, MdAccountBalance, MdLocationCity, MdPlace } from "react-icons/md";

const companyCards = [
  { icon: <MdTableChart className="text-3xl mb-1 text-teal-600" />, label: "COMPANY" },
  { icon: <MdPerson className="text-3xl mb-1 text-teal-600" />, label: "ROLES" },
  { icon: <MdDashboard className="text-3xl mb-1 text-teal-600" />, label: "COMMON MASTER" },
  { icon: <MdHandshake className="text-3xl mb-1 text-teal-600" />, label: "MEDIA MASTER" },
];

const basicCards = [
  { icon: <MdPublic className="text-3xl mb-1 text-teal-600" />, label: "COUNTRY" },
  { icon: <MdAccountBalance className="text-3xl mb-1 text-teal-600" />, label: "STATE" },
  { icon: <MdLocationCity className="text-3xl mb-1 text-teal-600" />, label: "CITY" },
  { icon: <MdPlace className="text-3xl mb-1 text-teal-600" />, label: "AREA" },
];

function AppConfig() {
  return (
    <div className="min-h-screen p-8 page-fade-in bg-[#f3fbfd]">
      
      <h2 className="text-xl tracking-tight mb-6">
        App{" "}
        <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
         Configuration
        </span>
      </h2>
      <section className="mb-8">
        <div className="font-semibold text-[#4b6e6e] mb-3 text-lg">My Company</div>
        <div className="flex flex-wrap gap-8 items-start">
          {companyCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-5 cursor-pointer hover:shadow-lg transition"
              style={{
                width: 130,
                height: 130,
                minWidth: 130,
                minHeight: 130,
                maxWidth: 130,
                maxHeight: 130,
                textAlign: "center",
              }}
            >
              {card.icon}
              <span
                className="font-semibold text-teal-700 text-sm mt-2 truncate w-full"
                style={{ whiteSpace: "normal", wordBreak: "break-word", minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="font-semibold text-[#4b6e6e] mb-3 text-lg">Basic/General Configurations</div>
        <div className="flex flex-wrap gap-8 items-start">
          {basicCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-5 cursor-pointer hover:shadow-lg transition"
              style={{
                width: 130,
                height: 130,
                minWidth: 130,
                minHeight: 130,
                maxWidth: 130,
                maxHeight: 130,
                textAlign: "center",
              }}
            >
              {card.icon}
              <span
                className="font-semibold text-teal-700 text-sm mt-2 truncate w-full"
                style={{ whiteSpace: "normal", wordBreak: "break-word", minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AppConfig;