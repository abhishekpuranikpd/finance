import { db } from "@/lib/db";
import React from "react";
import CustomerTable from "../components/allcustomerslist";

const CustomerslistPage = async () => {
  const customers = await db.customer.findMany({
    include: { scheme: true, user: true ,   payments: true, },
  });
  return <div><CustomerTable customers={customers}/></div>;
};

export default CustomerslistPage;
