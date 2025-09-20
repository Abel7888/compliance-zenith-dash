import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Plus, 
  Eye, 
  Edit, 
  MoreVertical, 
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LegalAgent {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "inactive";
  jurisdiction: string;
  lastActivity: string;
}

const mockAgents: LegalAgent[] = [
  {
    id: "1",
    name: "John Mitchell",
    email: "j.mitchell@lawfirm.com",
    status: "active",
    jurisdiction: "New York",
    lastActivity: "2 hours ago"
  },
  {
    id: "2", 
    name: "Sarah Chen",
    email: "s.chen@compliance.org",
    status: "active",
    jurisdiction: "California",
    lastActivity: "1 day ago"
  },
  {
    id: "3",
    name: "Robert Williams",
    email: "r.williams@legal.co",
    status: "pending",
    jurisdiction: "Texas", 
    lastActivity: "3 days ago"
  }
];

const LegalAgentsCard = () => {
  const [agents] = useState<LegalAgent[]>(mockAgents);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "inactive":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <CheckCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <motion.div
      className="dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Legal Agents</h3>
            <p className="text-sm text-muted-foreground">{agents.length} registered agents</p>
          </div>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Agent</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Legal Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter agent's full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="agent@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jurisdiction">Jurisdiction</Label>
                <Input id="jurisdiction" placeholder="e.g., New York, California" />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button 
                  className="btn-primary flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Add Agent
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className="p-4 bg-muted/20 hover:bg-muted/30 rounded-lg border border-border/50 transition-all duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-medium text-foreground">{agent.name}</h4>
                    {getStatusIcon(agent.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{agent.email}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{agent.jurisdiction}</span>
                    <span>•</span>
                    <span>Active {agent.lastActivity}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    agent.status === "active" 
                      ? "bg-success/10 text-success" 
                      : agent.status === "pending"
                      ? "bg-warning/10 text-warning"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {getStatusText(agent.status)}
                  </span>
                  
                  <motion.button
                    className="p-2 hover:bg-muted/50 rounded-md transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                  
                  <motion.button
                    className="p-2 hover:bg-muted/50 rounded-md transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        className="mt-4 pt-4 border-t border-border/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          variant="ghost" 
          className="w-full text-primary hover:bg-primary/10"
        >
          View All Agents →
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default LegalAgentsCard;