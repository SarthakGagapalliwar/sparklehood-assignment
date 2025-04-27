import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Incident } from "@/types/incident";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

interface IncidentListProps {
  incidents: Incident[];
}

export default function IncidentList({ incidents }: IncidentListProps) {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpanded = (id: number) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getSeverityColor = (severity: Incident["severity"]) => {
    switch (severity) {
      case "High": return "bg-red-900 text-red-200 border-red-800";
      case "Medium": return "bg-yellow-900 text-yellow-200 border-yellow-800";
      case "Low": return "bg-green-900 text-green-200 border-green-800";
    }
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {incidents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-10 text-center bg-gray-900 rounded-xl border-purple-900">
            <p className="text-gray-400">No incidents found matching the current filters.</p>
          </Card>
        </motion.div>
      ) : (
        <AnimatePresence>
          {incidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-6 bg-gray-900 transition-all hover:shadow-lg rounded-xl border-purple-900">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                      <motion.span 
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(incident.severity)}`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {incident.severity}
                      </motion.span>
                    </div>
                    <p className="text-sm text-purple-300">
                      Reported: {format(new Date(incident.reported_at), "PPp")}
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpanded(incident.id)}
                      className="flex items-center gap-2 border-purple-800 hover:bg-gray-800 text-purple-300"
                    >
                      <Eye className="w-4 h-4 text-purple-400" />
                      {expandedIds.includes(incident.id) ? "Hide Details" : "View Details"}
                    </Button>
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {expandedIds.includes(incident.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-purple-900">
                        <p className="text-gray-300 leading-relaxed">{incident.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
}