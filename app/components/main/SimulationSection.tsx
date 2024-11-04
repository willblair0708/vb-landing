import { useEffect, useRef, useState } from 'react';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

interface SimulationSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

interface CellNode {
  x: number;
  y: number;
  size: number;
  speed: number;
  type: 'nucleus' | 'organelle' | 'protein' | 'membrane';
  connections: number[];
}

interface ProcessNode {
  id: string;
  label: string;
  description: string;
  color: string;
  visualization: string;
}

interface Organelle {
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}

interface Protein {
  x: number;
  y: number;
  size: number;
  speed: number;
}

const PROCESS_STEPS: ProcessNode[] = [
  {
    id: 'genome',
    label: 'Genome Sequence',
    description: 'Raw genomic DNA sequence analysis',
    color: 'rgb(59, 130, 246)', // blue
    visualization: 'dna-sequence',
  },
  {
    id: 'motif',
    label: 'Motif & miRNA Discovery',
    description: 'Identify regulatory elements and miRNA targets',
    color: 'rgb(16, 185, 129)', // emerald
    visualization: 'motif-pattern',
  },
  {
    id: 'network',
    label: 'Gene Regulatory Networks',
    description: 'Assemble gene interaction networks',
    color: 'rgb(139, 92, 246)', // purple
    visualization: 'network',
  },
  {
    id: 'clusters',
    label: 'Cross-Species Clusters',
    description: 'Identify conserved patterns across species',
    color: 'rgb(236, 72, 153)', // pink
    visualization: 'clusters',
  },
  {
    id: 'proteins',
    label: 'Protein Interactions',
    description: 'Add protein embeddings & predicted interactions',
    color: 'rgb(234, 179, 8)', // yellow
    visualization: 'proteins',
  },
  {
    id: 'virtual-cell',
    label: 'Virtual Cell Model',
    description: 'Complete cellular simulation model',
    color: 'rgb(255, 255, 255)', // white
    visualization: 'cell-model',
  },
];

const generateNodes = (count: number): CellNode[] => {
  return Array(count)
    .fill(0)
    .map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: i === 0 ? 40 : Math.random() * 15 + 5,
      speed: Math.random() * 2 + 1,
      type:
        i === 0
          ? 'nucleus'
          : i < 5
            ? 'organelle'
            : i < 15
              ? 'protein'
              : 'membrane',
      connections: Array(Math.floor(Math.random() * 3 + 1))
        .fill(0)
        .map(() => Math.floor(Math.random() * count)),
    }));
};

const generateOrganelles = (count: number): Organelle[] => {
  return Array(count)
    .fill(0)
    .map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      speed: Math.random() * 10 + 5,
      delay: Math.random() * 2,
    }));
};

const generateProteins = (count: number): Protein[] => {
  return Array(count)
    .fill(0)
    .map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 15 + 10,
    }));
};

// Add these helper functions for more accurate visualizations
const generateDNASequence = () => ({
  sequence: ['GGACGATTTCAG', 'ACGTGCAGACTGA', 'CGTGACGTACGTC', 'TAATTAACAGGAA'],
  annotations: {
    promoter: { start: 4, end: 10, color: 'rgb(59, 130, 246)' },
    enhancer: { start: 15, end: 21, color: 'rgb(236, 72, 153)' },
    coding: { start: 25, end: 31, color: 'rgb(16, 185, 129)' },
  },
});

const generateMotifs = () => ({
  regulatory: {
    sequence: 'GTGCAG',
    color: 'rgb(59, 130, 246)',
    label: 'Regulatory Motif',
  },
  mirna: {
    sequence: 'TAATAA',
    color: 'rgb(239, 68, 68)',
    label: 'miRNA Target Site',
  },
});

const generateClusterData = () => ({
  species1: {
    name: 'H. sapiens',
    nodes: [
      { x: 100, y: 100, connections: [1, 2], expression: 0.8 },
      { x: 180, y: 100, connections: [2], expression: 0.6 },
      { x: 140, y: 160, connections: [0], expression: 0.9 },
    ],
    color: '#3B82F6',
  },
  species2: {
    name: 'M. musculus',
    nodes: [
      { x: 100, y: 100, connections: [1, 2], expression: 0.7 },
      { x: 180, y: 100, connections: [2], expression: 0.8 },
      { x: 140, y: 160, connections: [0], expression: 0.5 },
    ],
    color: '#EC4899',
  },
});

function StepVisualization({ step }: { step: string }) {
  switch (step) {
    case 'genome':
      const dnaData = generateDNASequence();
      return (
        <div className='relative h-full w-full bg-zinc-950 p-8 font-mono'>
          {/* Enhanced DNA Sequence Visualization */}
          <div className='grid gap-2'>
            {dnaData.sequence.map((seq, i) => (
              <motion.div
                key={i}
                className='relative whitespace-pre text-sm tracking-wider'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className='flex items-center gap-4'>
                  <span className='text-neutral-400'>{seq}</span>
                  <motion.div
                    className='h-0.5 flex-1 rounded-full bg-gradient-to-r from-blue-500/20 to-transparent'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scientific DNA Double Helix */}
          <motion.div
            className='absolute inset-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
          >
            <svg className='h-full w-full'>
              <defs>
                <linearGradient id='helix-gradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='0%'
                    stopColor='rgb(59, 130, 246)'
                    stopOpacity='0.3'
                  />
                  <stop
                    offset='50%'
                    stopColor='rgb(236, 72, 153)'
                    stopOpacity='0.3'
                  />
                  <stop
                    offset='100%'
                    stopColor='rgb(16, 185, 129)'
                    stopOpacity='0.3'
                  />
                </linearGradient>
              </defs>
              <motion.path
                d='M 50 0 C 150 50, 50 100, 150 150 C 250 200, 150 250, 250 300'
                stroke='url(#helix-gradient)'
                strokeWidth={2}
                fill='none'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
            </svg>
          </motion.div>
        </div>
      );

    case 'motif':
      const motifs = generateMotifs();
      return (
        <div className='relative h-full w-full bg-zinc-950 p-8'>
          <div className='space-y-4'>
            <div className='font-mono text-sm'>
              {/* Enhanced Motif Discovery Visualization */}
              <motion.div className='mb-4 space-y-2'>
                {generateDNASequence().sequence.map((seq, i) => (
                  <div key={i} className='relative'>
                    {seq.includes(motifs.regulatory.sequence) ? (
                      <>
                        <span className='text-neutral-400'>
                          {seq.split(motifs.regulatory.sequence)[0]}
                        </span>
                        <motion.span
                          className='font-bold'
                          style={{ color: motifs.regulatory.color }}
                          animate={{
                            backgroundColor: [
                              'rgba(59,130,246,0)',
                              'rgba(59,130,246,0.2)',
                              'rgba(59,130,246,0)',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {motifs.regulatory.sequence}
                        </motion.span>
                        <span className='text-neutral-400'>
                          {seq.split(motifs.regulatory.sequence)[1]}
                        </span>
                      </>
                    ) : seq.includes(motifs.mirna.sequence) ? (
                      <>
                        <span className='text-neutral-400'>
                          {seq.split(motifs.mirna.sequence)[0]}
                        </span>
                        <motion.span
                          className='font-bold'
                          style={{ color: motifs.mirna.color }}
                          animate={{
                            backgroundColor: [
                              'rgba(239,68,68,0)',
                              'rgba(239,68,68,0.2)',
                              'rgba(239,68,68,0)',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 1,
                          }}
                        >
                          {motifs.mirna.sequence}
                        </motion.span>
                        <span className='text-neutral-400'>
                          {seq.split(motifs.mirna.sequence)[1]}
                        </span>
                      </>
                    ) : (
                      <span className='text-neutral-400'>{seq}</span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      );

    case 'network':
      return (
        <div className='relative h-full w-full bg-zinc-950'>
          <svg className='h-full w-full'>
            <defs>
              <marker
                id='arrowhead'
                markerWidth='10'
                markerHeight='7'
                refX='9'
                refY='3.5'
                orient='auto'
              >
                <polygon points='0 0, 10 3.5, 0 7' fill='#475569' />
              </marker>
            </defs>
            <g>
              {/* Exact network pattern from diagram */}
              {[
                { x: 100, y: 100, connections: [1, 2] },
                { x: 200, y: 100, connections: [2] },
                { x: 150, y: 180, connections: [3, 4] },
                { x: 100, y: 260, connections: [4] },
                { x: 200, y: 260, connections: [] },
              ].map((node, i) => (
                <g key={i}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={15}
                    fill='#1E293B'
                    stroke='#475569'
                    initial={{ r: 0 }}
                    animate={{ r: 15 }}
                    transition={{ delay: i * 0.2 }}
                  />
                  {node.connections.map((target, j) => (
                    <motion.path
                      key={`${i}-${j}`}
                      d={`M ${node.x} ${node.y} L ${
                        [
                          { x: 200, y: 100 },
                          { x: 150, y: 180 },
                          { x: 100, y: 260 },
                          { x: 200, y: 260 },
                        ][target - 1].x
                      } ${
                        [
                          { x: 200, y: 100 },
                          { x: 150, y: 180 },
                          { x: 100, y: 260 },
                          { x: 200, y: 260 },
                        ][target - 1].y
                      }`}
                      stroke='#475569'
                      strokeWidth={2}
                      fill='none'
                      markerEnd='url(#arrowhead)'
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: i * 0.2 + 0.2, duration: 1 }}
                    />
                  ))}
                </g>
              ))}
            </g>
          </svg>
        </div>
      );

    case 'clusters':
      const clusterData = generateClusterData();
      return (
        <div className='relative h-full w-full bg-zinc-950 p-8'>
          <div className='grid h-full grid-cols-2 gap-8'>
            {[clusterData.species1, clusterData.species2].map((species, i) => (
              <motion.div
                key={i}
                className='relative rounded-xl border border-white/10 bg-white/5 p-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className='mb-4 text-sm font-medium text-white/80'>
                  {species.name}
                </div>
                <svg className='h-full w-full'>
                  <defs>
                    <radialGradient id={`gradient-${i}`}>
                      <stop offset='0%' stopColor={`${species.color}40`} />
                      <stop offset='100%' stopColor={`${species.color}00`} />
                    </radialGradient>
                  </defs>
                  {species.nodes.map((node, j) => (
                    <g key={j}>
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={20}
                        fill={`url(#gradient-${i})`}
                        stroke={species.color}
                        strokeWidth={2}
                        initial={{ r: 0 }}
                        animate={{ r: 20 * node.expression }}
                        transition={{ duration: 1, delay: j * 0.1 }}
                      />
                      {node.connections.map((target) => (
                        <motion.path
                          key={`${j}-${target}`}
                          d={`M ${node.x} ${node.y} L ${species.nodes[target].x} ${species.nodes[target].y}`}
                          stroke={species.color}
                          strokeWidth={1.5}
                          strokeOpacity={0.6}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: j * 0.1 }}
                        />
                      ))}
                    </g>
                  ))}
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'proteins':
      return (
        <div className='relative h-full w-full bg-zinc-950'>
          <motion.div className='absolute inset-0'>
            <svg className='h-full w-full'>
              <defs>
                <filter id='protein-glow'>
                  <feGaussianBlur stdDeviation='4' result='blur' />
                  <feMerge>
                    <feMergeNode in='blur' />
                    <feMergeNode in='SourceGraphic' />
                  </feMerge>
                </filter>
                <radialGradient id='protein-core'>
                  <stop
                    offset='0%'
                    stopColor='rgb(234, 179, 8)'
                    stopOpacity='0.8'
                  />
                  <stop
                    offset='100%'
                    stopColor='rgb(234, 179, 8)'
                    stopOpacity='0'
                  />
                </radialGradient>
              </defs>

              {/* Enhanced Protein Structure */}
              <g filter='url(#protein-glow)'>
                <motion.path
                  d='M 100 200 C 150 150, 200 250, 300 200'
                  stroke='rgb(234, 179, 8)'
                  strokeWidth={4}
                  fill='none'
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />

                {/* Improved Amino Acid Residues */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={120 + i * 15}
                    cy={200 + Math.sin(i * 0.3) * 20}
                    r={8}
                    fill='url(#protein-core)'
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      delay: i * 0.1,
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </g>
            </svg>
          </motion.div>
        </div>
      );

    case 'virtual-cell':
      return (
        <div className='relative h-full w-full bg-zinc-950'>
          <motion.div
            className='absolute inset-0 rounded-full'
            style={{
              background:
                'radial-gradient(circle at center, rgba(16, 185, 129, 0.1), transparent)',
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Cell Membrane */}
            <motion.div
              className='absolute inset-0 rounded-full border border-emerald-500/20'
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Organelles with interactions */}
            {generateOrganelles(6).map((organelle, i) => (
              <motion.div
                key={i}
                className='absolute rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent'
                style={{
                  left: `${organelle.x}%`,
                  top: `${organelle.y}%`,
                  width: organelle.size,
                  height: organelle.size,
                }}
                animate={{
                  x: [0, 10, -10, 0],
                  y: [0, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: organelle.speed,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: organelle.delay,
                }}
              />
            ))}

            {/* Protein interactions */}
            {generateProteins(15).map((protein, i) => (
              <motion.div
                key={i}
                className='absolute h-2 w-2 rounded-full bg-yellow-500/50'
                style={{
                  left: `${protein.x}%`,
                  top: `${protein.y}%`,
                  filter: 'blur(1px)',
                }}
                animate={{
                  x: [0, 20, -20, 0],
                  y: [0, -20, 20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: protein.speed,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </motion.div>
        </div>
      );

    default:
      return null;
  }
}

export default function SimulationSection({
  id,
  bgColor,
  isMobile,
}: SimulationSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  const [activeStep, setActiveStep] = useState<string>('genome');
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative min-h-screen overflow-hidden bg-zinc-900'
      style={{ backgroundColor: bgColor }}
    >
      {/* Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]' />

      {/* Grid Pattern */}
      <div className='absolute inset-0'>
        <svg className='h-full w-full opacity-[0.02]'>
          <pattern
            id='grid'
            x='0'
            y='0'
            width='40'
            height='40'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M 40 0 L 0 0 0 40'
              fill='none'
              stroke='white'
              strokeWidth='0.5'
            />
          </pattern>
          <rect width='100%' height='100%' fill='url(#grid)' />
        </svg>
      </div>

      {/* Main Content */}
      <div className='relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8'>
        <div className='grid gap-12 lg:grid-cols-2 lg:gap-24'>
          {/* Left Side - Process Visualization */}
          <div className='aspect-square relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm'>
            <StepVisualization step={activeStep} />
            {/* Process Steps */}
            <div className='absolute bottom-0 left-0 right-0 flex justify-between p-4'>
              {PROCESS_STEPS.map((step, index) => (
                <motion.button
                  key={step.id}
                  className={`relative rounded-full p-2 transition-colors ${
                    activeStep === step.id ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                  onHoverStart={() => setHoveredStep(step.id)}
                  onHoverEnd={() => setHoveredStep(null)}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div
                    className='h-3 w-3 rounded-full'
                    style={{ backgroundColor: step.color }}
                  />
                  {(hoveredStep === step.id || activeStep === step.id) && (
                    <motion.div
                      className='absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-white/10 px-2 py-1 text-xs'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {step.label}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className='space-y-8'>
            <motion.div className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm'>
              <div className='relative h-2 w-2'>
                <div className='absolute h-full w-full animate-ping rounded-full bg-emerald-500/30' />
                <div className='relative h-full w-full rounded-full bg-emerald-500' />
              </div>
              <span className='text-sm font-medium text-white'>
                Virtual Cell Pipeline
              </span>
            </motion.div>

            <h2 className='font-book text-4xl leading-tight tracking-tight text-white lg:text-5xl'>
              <span className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent'>
                From Genome to
              </span>
              <br />
              Virtual Cell Model
            </h2>

            <p className='text-lg leading-relaxed text-neutral-300'>
              Our platform transforms raw genomic sequences into comprehensive
              virtual cell models through a sophisticated pipeline of AI-powered
              analysis and cross-species comparison.
            </p>

            {/* Step Description */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='rounded-xl border border-white/10 bg-white/5 p-6'
            >
              <h3 className='mb-2 text-xl font-medium text-white'>
                {PROCESS_STEPS.find((step) => step.id === activeStep)?.label}
              </h3>
              <p className='text-neutral-300'>
                {
                  PROCESS_STEPS.find((step) => step.id === activeStep)
                    ?.description
                }
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
