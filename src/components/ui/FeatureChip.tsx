"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureChipProps {
  icon?: React.ReactNode;
  label: string;
  className?: string;
}

function FeatureChip({ icon, label, className }: FeatureChipProps) {
  return (
    <motion.span
      className={cn("feature-chip", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.05 }}
    >
      {icon}
      <span>{label}</span>
    </motion.span>
  );
}

export { FeatureChip };
