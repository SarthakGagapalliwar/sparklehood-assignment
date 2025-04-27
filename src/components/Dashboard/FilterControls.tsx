import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Severity } from "@/types/incident";
import { motion } from "motion/react";

interface FilterControlsProps {
  selectedSeverity: Severity | "All";
  onSeverityChange: (severity: Severity | "All") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
}

export default function FilterControls({
  selectedSeverity,
  onSeverityChange,
  sortOrder,
  onSortOrderChange,
}: FilterControlsProps) {
  return (
    <motion.div
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.4 }}
      initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className="p-6 bg-gray-900 shadow-md rounded-xl border-purple-900">
        <div className="flex flex-col sm:flex-row gap-6">
          <motion.div 
            className="flex-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-purple-300">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Filter className="w-4 h-4 text-purple-500" />
              </motion.div>
              Filter by Severity
            </label>
            <Select
              value={selectedSeverity}
              onValueChange={(value) => onSeverityChange(value as Severity | "All")}
            >
              <SelectTrigger className="w-full bg-gray-800 border-purple-800 text-gray-200">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-purple-800 text-gray-200">
                <SelectItem value="All">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div 
            className="flex-1"
            // initial={{ x: 20, opacity: 0 }}
            // animate={{ x: 0, opacity: 1 }}
            // transition={{ delay: 0.2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-purple-300">
              <motion.div animate={{ rotate: sortOrder === "desc" ? 0 : 180 }} transition={{ duration: 0.3 }}>
                {sortOrder === "desc" ? (
                  <ArrowDown className="w-4 h-4 text-purple-500" />
                ) : (
                  <ArrowUp className="w-4 h-4 text-purple-500" />
                )}
              </motion.div>
              Sort by Date
            </label>
            <Select
              value={sortOrder}
              onValueChange={(value) => onSortOrderChange(value as "asc" | "desc")}
            >
              <SelectTrigger className="w-full bg-gray-800 border-purple-800 text-gray-200">
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-purple-800 text-gray-200">
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}