"use client";

import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

// GlassCard
export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={classNames(
        "rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// GlassButton
export function GlassButton({ 
  children, 
  className, 
  variant = "default", 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: "default" | "primary" | "danger" 
}) {
  const variants = {
    default: "bg-white/70 dark:bg-white/10 text-black dark:text-white hover:bg-blue-400/20",
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    danger: "bg-red-500/80 hover:bg-red-600 text-white"
  };
  
  return (
    <button
      className={classNames(
        "backdrop-blur-md border border-black/10 dark:border-white/20 font-semibold rounded-lg px-4 py-2 shadow transition hover:scale-105 active:scale-95 duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// GlassInput
export function GlassInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={classNames(
        "w-full rounded-lg px-4 py-2 bg-white/30 dark:bg-white/5 backdrop-blur-md text-black dark:text-white placeholder-black/40 dark:placeholder-white/50 border border-black/10 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
        props.className
      )}
    />
  );
}

// GlassTextarea
export function GlassTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={classNames(
        "w-full rounded-lg px-4 py-2 bg-white/30 dark:bg-white/5 backdrop-blur-md text-black dark:text-white placeholder-black/40 dark:placeholder-white/50 border border-black/10 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none",
        props.className
      )}
    />
  );
}

// GlassModal
export function GlassModal({ 
  children, 
  isOpen, 
  onClose, 
  className 
}: { 
  children: React.ReactNode; 
  isOpen: boolean; 
  onClose: () => void; 
  className?: string; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className={classNames(
          "relative z-10 w-full max-w-lg max-h-[90vh] overflow-auto rounded-2xl bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 shadow-2xl p-6",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}

// GlassSelect
export function GlassSelect({ 
  children, 
  className, 
  ...props 
}: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select
      {...props}
      className={classNames(
        "w-full rounded-lg px-4 py-2 bg-white/30 dark:bg-white/5 backdrop-blur-md text-black dark:text-white border border-black/10 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition",
        className
      )}
    >
      {children}
    </select>
  );
}