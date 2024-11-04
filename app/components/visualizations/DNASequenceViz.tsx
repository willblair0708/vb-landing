import { motion } from 'framer-motion';
import { generateDNAPath } from '../main/helpers';

interface DNASequenceVizProps {
  sequence: string[];
  annotations: Array<{
    start: number;
    end: number;
    color: string;
    label?: string;
    type?: string;
    confidence?: number;
    conservation?: number;
  }>;
  height?: number;
  width?: number;
  showBaseLabels?: boolean;
  showBackbone?: boolean;
  animateTranscription?: boolean;
  showConfidenceScores?: boolean;
  showConservation?: boolean;
  showEvolutionaryHistory?: boolean;
  showProteinBinding?: boolean;
}

export function DNASequenceViz({ 
  sequence, 
  annotations,
  height = 400,
  width = 800
}: DNASequenceVizProps) {
  return (
    <div className="relative h-full w-full">
      <svg 
        className="h-full w-full" 
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        
        {/* DNA Double Helix */}
        <motion.path
          d={generateDNAPath()}
          stroke="url(#dna-gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Annotations */}
        {annotations.map((annotation, i) => (
          <motion.rect
            key={i}
            x={annotation.start * 4}
            y={180}
            width={(annotation.end - annotation.start) * 4}
            height={40}
            fill={annotation.color}
            opacity={0.2}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
} 