import { motion } from "framer-motion";
import Navigation from "./Navigation";
import HealthScoreCard from "./HealthScoreCard";
import LegalAgentsCard from "./LegalAgentsCard";
import RiskInsightsCard from "./RiskInsightsCard";
import RegulatoryFeedCard from "./RegulatoryFeedCard";

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <Navigation />
      
      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Welcome Card - Full width on mobile, spans 2 columns on desktop */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <HealthScoreCard userName="Sarah" score={92} />
          </motion.div>

          {/* Legal Agents Card */}
          <motion.div variants={itemVariants}>
            <LegalAgentsCard />
          </motion.div>

          {/* Risk Insights Card */}
          <motion.div variants={itemVariants}>
            <RiskInsightsCard />
          </motion.div>

          {/* Regulatory Feed Card - Spans 2 columns on desktop */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <RegulatoryFeedCard />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-16 py-8 text-center border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <span>© 2024 Compliance Cockpit</span>
            <span>•</span>
            <span>RegTech & Risk Management Platform</span>
            <span>•</span>
            <motion.span
              className="text-primary font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Powered by Advanced Analytics
            </motion.span>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Dashboard;