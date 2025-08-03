"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, CreditCard, ListChecks } from "lucide-react";

export default function CardAvailability({ initialSchemes = [] }) {
  const router = useRouter();
    const [schemes, setSchemes] = useState(initialSchemes);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [cards, setCards] = useState([]); 
  const [loading, setLoading] = useState(false);

  // Fetch all schemes
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await fetch("/api/schema/scheme");
        const data = await res.json();
        setSchemes(data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };
    fetchSchemes();
  }, []);

  // Fetch card status for selected scheme
  useEffect(() => {
    if (!selectedScheme) return;
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/schema/${selectedScheme}/card-status`);
        const data = await res.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching card status:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [selectedScheme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <ListChecks className="h-6 w-6 text-emerald-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
              Card Number Availability
            </h1>
          </div>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="shadow-lg border-emerald-200 bg-white/90 backdrop-blur-md">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-xl">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Select Scheme
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            {/* Scheme Selection */}
            <Select onValueChange={setSelectedScheme}>
              <SelectTrigger className="w-full sm:w-72 mb-6 border-emerald-300 focus:ring-emerald-400">
                <SelectValue placeholder="Choose an investment scheme" />
              </SelectTrigger>
              <SelectContent>
                {schemes.map((scheme) => (
                  <SelectItem key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="animate-spin h-6 w-6 text-emerald-600" />
              </div>
            )}

            {/* Display cards */}
            {!loading && selectedScheme && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cards.map((card) => (
                  <div
                    key={card.cardNo}
                    className={`p-4 rounded-xl text-center font-medium shadow-md transition-all duration-300 hover:scale-105 ${
                      card.status === "BOOKED"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-green-100 text-green-700 border border-green-200"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <CreditCard
                        className={`h-6 w-6 ${
                          card.status === "BOOKED"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      />
                      <span>{card.cardNo}</span>
                      <Badge
                        variant="outline"
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          card.status === "BOOKED"
                            ? "bg-red-200 text-red-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {card.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && selectedScheme && cards.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                No cards found for this scheme.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
