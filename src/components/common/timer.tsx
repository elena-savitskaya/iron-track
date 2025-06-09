"use client";

import React from "react";

type CommonTimerProps = {
  elapsedSeconds: number;
  radius?: number;
  stroke?: number;
};

export const CommonTimer = ({
  elapsedSeconds,
  radius = 50,
  stroke = 6,
}: CommonTimerProps) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const maxSeconds = 60 * 60;
  const progress = Math.min(elapsedSeconds / maxSeconds, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="rotate-[-90deg]"
      style={{
        color: "var(--foreground)",
        transition: "color 0.3s ease",
      }}
    >
      <circle
        stroke="var(--muted)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{
          transition: "stroke 0.3s ease",
        }}
      />
      <circle
        stroke="var(--chart-2)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          strokeDashoffset,
          transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease",
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="14"
        fill="currentColor"
        transform={`rotate(90, ${radius}, ${radius})`}
        style={{
          transition: "fill 0.3s ease",
        }}
      >
        {Math.floor(elapsedSeconds / 60)}:
        {String(elapsedSeconds % 60).padStart(2, "0")}
      </text>
    </svg>
  );
};
