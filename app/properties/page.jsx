import React from "react";
import { fetchProperties } from "@/utils/requests";
import PropertySearchForm from "@/components/PropertySearchForm";
import Properties from "../../components/Properties";
const PropertiesPage = async () => {
  const properties = await fetchProperties();
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createAt));

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};

export default PropertiesPage;
