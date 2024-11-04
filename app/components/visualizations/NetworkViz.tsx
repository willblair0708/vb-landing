import { motion } from 'framer-motion';

import { generateConnectionPath } from '../main/helpers';

interface NetworkVizProps {
  nodes: Array<{
    id: string;
    x: number;
    y: number;
    size: number;
    color: string;
    type: string;
  }>;
  connections: Array<{
    source: { x: number; y: number };
    target: { x: number; y: number };
    strength: number;
  }>;
  showLabels?: boolean;
  showDirectionality?: boolean;
  showStrengthIndicators?: boolean;
  showClusters?: boolean;
  showEvolutionaryScores?: boolean;
  showForceSimulation?: boolean;
  nodeTypes?: Record<string, string>;
  clusterColors?: string[];
}

export function NetworkViz({ nodes, connections }: NetworkVizProps) {
  return (
    <div className='relative h-full w-full'>
      <svg className='h-full w-full'>
        {/* Connections */}
        {connections.map((connection, i) => (
          <motion.path
            key={i}
            d={generateConnectionPath(connection)}
            stroke='rgba(255,255,255,0.1)'
            strokeWidth={1}
            fill='none'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.05 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill={node.color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </svg>
    </div>
  );
}
