import { motion } from "framer-motion";
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  FileText,
  ArrowRight,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RiskInsight {
  id: string;
  area: string;
  riskLevel: "high" | "medium" | "low";
  description: string;
  affectedSystems: number;
  trend: "up" | "down" | "stable";
}

const mockRiskInsights: RiskInsight[] = [
  {
    id: "1",
    area: "Data Privacy Compliance",
    riskLevel: "high", 
    description: "GDPR compliance gaps detected in customer data handling processes",
    affectedSystems: 3,
    trend: "up"
  },
  {
    id: "2",
    area: "Financial Reporting",
    riskLevel: "medium",
    description: "Minor discrepancies in quarterly financial documentation",
    affectedSystems: 1,
    trend: "stable"
  },
  {
    id: "3", 
    area: "Cybersecurity Framework",
    riskLevel: "low",
    description: "Regular security audits show strong compliance posture",
    affectedSystems: 0,
    trend: "down"
  }
];

const RiskInsightsCard = () => {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high":
        return <Flame className="w-4 h-4 text-destructive" />;
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "low":
        return <Shield className="w-4 h-4 text-success" />;
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "border-destructive/20 bg-destructive/5";
      case "medium":
        return "border-warning/20 bg-warning/5";
      case "low":
        return "border-success/20 bg-success/5";
      default:
        return "border-muted/20 bg-muted/5";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      case "stable":
        return "→";
      default:
        return "→";
    }
  };

  return (
    <motion.div
      className="dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-warning/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Risk Management Insights</h3>
            <p className="text-sm text-muted-foreground">Top 3 areas requiring attention</p>
          </div>
        </div>
        
        <Button 
          className="btn-accent flex items-center space-x-2"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">View Full Report</span>
        </Button>
      </div>

      <div className="space-y-4">
        {mockRiskInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${getRiskColor(insight.riskLevel)}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getRiskIcon(insight.riskLevel)}
                <div>
                  <h4 className="font-medium text-foreground">{insight.area}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    insight.riskLevel === "high" 
                      ? "bg-destructive/20 text-destructive" 
                      : insight.riskLevel === "medium"
                      ? "bg-warning/20 text-warning"
                      : "bg-success/20 text-success"
                  }`}>
                    {insight.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTrendIcon(insight.trend)}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {insight.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{insight.affectedSystems} systems affected</span>
                <span>•</span>
                <span>Updated 2 hours ago</span>
              </div>
              
              <motion.button
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1"
                whileHover={{ x: 2 }}
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Risk Assessment Summary</p>
            <p className="text-xs text-muted-foreground">1 high, 1 medium, 1 low risk areas identified</p>
          </div>
          <Button variant="ghost" className="text-primary hover:bg-primary/10">
            View Detailed Analysis
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RiskInsightsCard;