// app/(superadmin)/customerslist/page.js
import { db } from "@/lib/db";
import React from "react";
import CustomerTable from "../components/allcustomerslist";

const CustomerslistPage = async () => {
  const customers = await db.customer.findMany({
    include: { 
      scheme: true, 
      user: true,
      payments: true 
    },
  });

  // Extract unique schemes and users from the customers data
  const schemes = [...new Set(customers.map(c => c.scheme).filter(Boolean))];
  const users = [...new Set(customers.map(c => c.user).filter(Boolean))];

  return (
    <div>
      <CustomerTable 
        customers={customers} 
        schemes={schemes} 
        users={users} 
      />
    </div>
  );
};

export default CustomerslistPage;