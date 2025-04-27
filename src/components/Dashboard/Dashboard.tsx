import { useState } from "react";
import { Card } from "@/components/ui/card";
import { mockIncidents } from "@/data/mockIncidents";
import { Incident, Severity } from "@/types/incident";
import IncidentList from "./IncidentList";
import IncidentForm from "./IncidentForm";
import FilterControls from "./FilterControls";
import { motion } from "motion/react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { ShinyButton } from "../ui/shiny-button";

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | "All">(
    "All"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredIncidents = incidents
    .filter((incident) =>
      selectedSeverity === "All" ? true : incident.severity === selectedSeverity
    )
    .sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const handleAddIncident = (
    newIncident: Omit<Incident, "id" | "reported_at">
  ) => {
    const incident: Incident = {
      ...newIncident,
      id: Math.max(...incidents.map((i) => i.id)) + 1,
      reported_at: new Date().toISOString(),
    };
    setIncidents((prev) => [...prev, incident]);
  };

  return (
    <div className="min-h-screen bg-gray-950 relative font-raleway">
      {/* Background Gradient */}
      <BackgroundGradientAnimation containerClassName="fixed inset-0 z-0" />

      {/* Content */}
      <motion.div
        className="container mx-auto px-5 py-10 relative z-10"
        // variants={container}
        // initial="hidden"
        // animate="show"
      >
        <motion.div className="mb-10 flex justify-between items-center">
          <div>
          <motion.h1
            className="text-4xl font-bold text-white mb-3"
            // initial={{ opacity: 0, scale: 0 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{
            //     duration: 0.4,
            //     scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            // }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AI Safety Incident Dashboard
          </motion.h1>
          <motion.p
            className="text-purple-300"
            //  initial={{ opacity: 0, scale: 0 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{
            //     duration: 0.4,
            //     scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            // }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Monitor and report AI safety incidents in real-time
          </motion.p>
          
          </div>
          <ShinyButton className="border-0">SparkleHood</ShinyButton>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          <motion.div className="space-y-8">
            <FilterControls
              selectedSeverity={selectedSeverity}
              onSeverityChange={setSelectedSeverity}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
            />
            <IncidentList incidents={filteredIncidents} />
          </motion.div>

          <motion.div className="space-y-6">
            <Card className="p-8 sticky top-6 bg-gray-900 shadow-lg rounded-xl border-purple-900">
              <IncidentForm onSubmit={handleAddIncident} />
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
