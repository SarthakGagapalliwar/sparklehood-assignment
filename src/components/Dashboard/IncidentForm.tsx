import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Incident, Severity } from "@/types/incident";
import { motion } from "motion/react";

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, "id" | "reported_at">) => void;
}

export default function IncidentForm({ onSubmit }: IncidentFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "" as Severity | "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.severity) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      title: formData.title,
      description: formData.description,
      severity: formData.severity as Severity,
    });

    setFormData({
      title: "",
      description: "",
      severity: "",
    });

    toast({
      title: "Success",
      description: "New incident has been reported",
    });
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center gap-2 mb-4"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <AlertCircle className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">Report New Incident</h2>
      </motion.div>
      
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label className="text-sm font-medium text-purple-300">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter incident title"
          className="w-full bg-gray-800 border-purple-800 text-gray-200 placeholder-gray-500"
        />
      </motion.div>

      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <label className="text-sm font-medium text-purple-300">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the incident in detail"
          rows={4}
          className="w-full resize-none bg-gray-800 border-purple-800 text-gray-200 placeholder-gray-500"
        />
      </motion.div>

      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <label className="text-sm font-medium text-purple-300">Severity</label>
        <Select
          value={formData.severity}
          onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value as Severity }))}
        >
          <SelectTrigger className="bg-gray-800 border-purple-800 text-gray-200">
            <SelectValue placeholder="Select severity level" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-purple-800 text-gray-200">
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Submit Report
        </Button>
      </motion.div>
    </motion.form>
  );
}