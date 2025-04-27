"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, type AnimationProps } from "motion/react";
import React, { useEffect } from "react";

const animationProps = {
  initial: { "--x": "100%" as string, scale: 0.8 },
  animate: { "--x": "-100%" as string, scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, variant = "primary", ...props }, ref) => {
  // Define color variables to match the background gradient theme
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--button-primary", 
      "168, 85, 247" // purple-500, matching firstColor
    );
    document.documentElement.style.setProperty(
      "--button-secondary", 
      "192, 132, 252" // purple-400, matching secondColor
    );
    document.documentElement.style.setProperty(
      "--button-tertiary", 
      "216, 180, 254" // purple-300, matching pointerColor
    );
  }, []);
  
  // Determine which color variable to use based on variant
  const colorVar = `--button-${variant}`;
  
  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out",
        "hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(var(--button-primary),0.3)]",
        // Glass effect with subtle gradient border
        "dark:bg-[rgba(17,24,39,0.2)] border border-[rgba(var(--button-primary),0.2)]",
        className,
      )}
      {...animationProps}
      {...props}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide dark:font-light dark:text-[rgba(255,255,255,0.9)]"
        style={{
          maskImage:
            `linear-gradient(-75deg,rgba(var(${colorVar}),1) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),rgba(var(${colorVar}),1) calc(var(--x) + 100%))`,
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          backgroundImage:
            `linear-gradient(-75deg,rgba(var(${colorVar}),0.2) calc(var(--x)+20%),rgba(var(${colorVar}),0.6) calc(var(--x)+25%),rgba(var(${colorVar}),0.2) calc(var(--x)+100%))`,
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
      ></span>
    </motion.button>
  );
});

ShinyButton.displayName = "ShinyButton";