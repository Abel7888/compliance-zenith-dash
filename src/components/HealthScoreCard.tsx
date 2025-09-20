import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface HealthScoreCardProps {
  userName: string;
  score: number;
}

const HealthScoreCard = ({ userName = "Sarah", score = 92 }: HealthScoreCardProps) => {
  const getScoreStatus = (score: number) => {
    if (score >= 85) return { color: "success", icon: CheckCircle, text: "Excellent" };
    if (score >= 70) return { color: "warning", icon: TrendingUp, text: "Good" };
    return { color: "destructive", icon: AlertTriangle, text: "Needs Attention" };
  };

  const status = getScoreStatus(score);

  return (
    <motion.div
      className="dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Welcome back, {userName}!
          </h2>
          <p className="text-muted-foreground mt-1">
            Here's your compliance overview for today
          </p>
        </div>
        <motion.div
          className="p-3 bg-gradient-primary rounded-full shadow-soft"
          whileHover={{ rotate: 15 }}
          transition={{ duration: 0.3 }}
        >
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <status.icon className="w-5 h-5 text-success" />
            <span className="font-medium text-success">
              {status.text} Compliance Health
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Risk Assessment</span>
              <span className="font-medium text-success">Low Risk</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">2 hours ago</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Agents</span>
              <span className="font-medium">12</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center ml-8">
          <div className="w-32 h-32 mb-3">
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                pathColor: score >= 85 ? "#22c55e" : score >= 70 ? "#f59e0b" : "#ef4444",
                textColor: "hsl(var(--foreground))",
                trailColor: "hsl(var(--muted))",
                pathTransitionDuration: 1.5,
                textSize: "16px",
              })}
            />
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Compliance Score
          </p>
        </div>
      </div>

      <motion.div
        className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-primary font-medium">
          🎯 Your compliance score improved by 3% this week. Keep up the great work!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HealthScoreCard;