import { motion } from "framer-motion";
import { 
  Radio, 
  ExternalLink, 
  Clock,
  AlertCircle,
  FileText,
  Globe
} from "lucide-react";

interface RegulatoryUpdate {
  id: string;
  source: "SEC" | "FINRA" | "CMS" | "CFTC" | "FTC";
  title: string;
  description: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
  category: string;
  url?: string;
}

const mockUpdates: RegulatoryUpdate[] = [
  {
    id: "1",
    source: "SEC",
    title: "New Climate Risk Disclosure Requirements",
    description: "The SEC has finalized rules requiring public companies to disclose climate-related risks and greenhouse gas emissions.",
    timestamp: "2 hours ago",
    priority: "high",
    category: "Environmental Disclosure",
    url: "#"
  },
  {
    id: "2",
    source: "FINRA",
    title: "Updated Cybersecurity Guidelines",
    description: "FINRA issues updated guidance on cybersecurity practices for broker-dealers following recent security incidents.",
    timestamp: "4 hours ago", 
    priority: "medium",
    category: "Cybersecurity",
    url: "#"
  },
  {
    id: "3",
    source: "CMS",
    title: "Healthcare Data Privacy Amendment",
    description: "CMS announces amendments to healthcare data privacy requirements affecting patient information handling.",
    timestamp: "6 hours ago",
    priority: "medium", 
    category: "Data Privacy",
    url: "#"
  },
  {
    id: "4",
    source: "SEC",
    title: "Digital Asset Trading Platform Rules",
    description: "New regulatory framework for digital asset trading platforms comes into effect next quarter.",
    timestamp: "8 hours ago",
    priority: "high",
    category: "Digital Assets",
    url: "#"
  },
  {
    id: "5",
    source: "FTC",
    title: "Consumer Protection Updates",
    description: "FTC releases new guidelines on consumer data protection and algorithmic decision-making transparency.",
    timestamp: "12 hours ago",
    priority: "low",
    category: "Consumer Protection", 
    url: "#"
  }
];

const RegulatoryFeedCard = () => {
  const getSourceColor = (source: string) => {
    const colors = {
      SEC: "bg-blue-500",
      FINRA: "bg-purple-500",
      CMS: "bg-green-500",
      CFTC: "bg-orange-500",
      FTC: "bg-red-500"
    };
    return colors[source as keyof typeof colors] || "bg-gray-500";
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "medium":
        return <Clock className="w-4 h-4 text-warning" />;
      case "low":
        return <FileText className="w-4 h-4 text-success" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-warning bg-warning/5";
      case "low":
        return "border-l-success bg-success/5";
      default:
        return "border-l-muted bg-muted/5";
    }
  };

  return (
    <motion.div
      className="dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="p-2 bg-success/10 rounded-lg"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Radio className="w-5 h-5 text-success" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Real-Time Regulatory Feed</h3>
            <p className="text-sm text-muted-foreground">Latest updates from regulatory bodies</p>
          </div>
        </div>
        
        <motion.button
          className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="w-5 h-5 text-muted-foreground" />
        </motion.button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {mockUpdates.map((update, index) => (
          <motion.div
            key={update.id}
            className={`p-4 border-l-4 rounded-r-lg transition-all duration-200 hover:shadow-soft ${getPriorityColor(update.priority)}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getSourceColor(update.source)}`}>
                  {update.source}
                </span>
                {getPriorityIcon(update.priority)}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{update.timestamp}</span>
                {update.url && (
                  <motion.button
                    className="text-primary hover:text-primary/80"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </motion.button>
                )}
              </div>
            </div>
            
            <h4 className="font-medium text-foreground mb-2 text-sm">
              {update.title}
            </h4>
            
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {update.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-muted/50 rounded-full text-xs font-medium text-muted-foreground">
                {update.category}
              </span>
              
              <motion.button
                className="text-primary hover:text-primary/80 text-xs font-medium"
                whileHover={{ x: 2 }}
              >
                Read More →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-6 pt-4 border-t border-border/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Last updated: Just now
          </p>
          <motion.button
            className="text-primary hover:text-primary/80 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            View All Updates
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegulatoryFeedCard;