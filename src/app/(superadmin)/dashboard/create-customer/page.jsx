import { db } from "@/lib/db";
import { getSession } from "@/lib/getsession";
import React from "react";
import CreateCustomerForm from "../components/create-customer";
import { redirect } from "next/navigation";

const CreateCustomerPage = async () => {
  const session = await getSession();
  if (!session || !session.email) {
    redirect("/")
  }
  const user = await db.user.findUnique({
    where: { phone: session.mobile },
  }); if (!user) {
    redirect("/")
  }
  const schemes = await db.scheme.findMany({});
  return (
    <div>
      {" "}
      <CreateCustomerForm userId={user.id} schemeList={schemes} />{" "}
    </div>
  );
};

export default CreateCustomerPage;
