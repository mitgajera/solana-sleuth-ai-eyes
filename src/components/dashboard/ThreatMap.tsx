
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ThreatMapProps {
  className?: string;
}

const ThreatMap: React.FC<ThreatMapProps> = ({ className }) => {
  const nodes = [
    { id: "n1", x: 30, y: 20, size: 12, color: "#8B5CF6", pulse: true },
    { id: "n2", x: 70, y: 30, size: 8, color: "#8B5CF6" },
    { id: "n3", x: 50, y: 50, size: 14, color: "#06B6D4" },
    { id: "n4", x: 25, y: 70, size: 10, color: "#06B6D4" },
    { id: "n5", x: 80, y: 65, size: 16, color: "#F97316", pulse: true },
    { id: "n6", x: 60, y: 80, size: 9, color: "#8B5CF6" },
    { id: "n7", x: 40, y: 35, size: 11, color: "#F97316" },
    { id: "n8", x: 75, y: 45, size: 13, color: "#EF4444", pulse: true }
  ];

  const connections = [
    { from: "n1", to: "n2" },
    { from: "n1", to: "n3", suspicious: true },
    { from: "n2", to: "n4" },
    { from: "n3", to: "n5" },
    { from: "n4", to: "n6", suspicious: true },
    { from: "n5", to: "n7" },
    { from: "n6", to: "n8", suspicious: true },
    { from: "n3", to: "n8" },
    { from: "n7", to: "n1" },
  ];

  return (
    <Card className={cn("cyber-card h-full border-opacity-20", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Threat Network Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64 relative bg-cyber-bg rounded-md border border-cyber-primary/20 overflow-hidden">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h-line-${i}`} className="absolute left-0 right-0 border-t border-cyber-primary/30" style={{ top: `${i * 10}%` }}></div>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v-line-${i}`} className="absolute top-0 bottom-0 border-l border-cyber-primary/30" style={{ left: `${i * 10}%` }}></div>
            ))}
          </div>
          
          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map((conn, idx) => {
              const from = nodes.find(n => n.id === conn.from);
              const to = nodes.find(n => n.id === conn.to);
              if (!from || !to) return null;
              
              return (
                <line
                  key={`conn-${idx}`}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={conn.suspicious ? "#EF4444" : "#6366F1"}
                  strokeWidth={conn.suspicious ? 1.5 : 1}
                  strokeOpacity={conn.suspicious ? 0.8 : 0.4}
                  strokeDasharray={conn.suspicious ? "4 2" : ""}
                />
              );
            })}
          </svg>
          
          {/* Nodes */}
          {nodes.map(node => (
            <div
              key={node.id}
              className={cn(
                "absolute rounded-full border transform -translate-x-1/2 -translate-y-1/2", 
                node.pulse ? "animate-pulse-glow" : ""
              )}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                backgroundColor: `${node.color}30`,
                borderColor: node.color,
              }}
            />
          ))}
          
          {/* Legend */}
          <div className="absolute bottom-2 right-2 bg-background/80 p-2 rounded-md text-xs border border-border flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-primary/30 border border-cyber-primary"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-accent/30 border border-cyber-accent"></div>
              <span>Suspicious</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-danger/30 border border-cyber-danger"></div>
              <span>Malicious</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatMap;
