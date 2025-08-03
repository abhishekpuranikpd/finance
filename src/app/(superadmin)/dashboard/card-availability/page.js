import CardAvailability from "../components/CardAvailability";
import { db } from "@/lib/db";

export default async function CardAvailabilityPage() {
  // Fetch schemes on the server
  const schemes = await db.scheme.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="p-6">
      <CardAvailability initialSchemes={schemes} />
    </div>
  );
}