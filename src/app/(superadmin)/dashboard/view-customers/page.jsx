// app/(superadmin)/customerslist/page.js
import { db } from "../../../../lib/db";
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

  // ✅ Deduplicate schemes
  const schemesMap = new Map();
  customers.forEach(c => {
    if (c.scheme) {
      schemesMap.set(c.scheme.id, c.scheme);
    }
  });
  const schemes = Array.from(schemesMap.values());

  // ✅ Deduplicate users
  const usersMap = new Map();
  customers.forEach(c => {
    if (c.user) {
      usersMap.set(c.user.id, c.user);
    }
  });
  const users = Array.from(usersMap.values());

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
