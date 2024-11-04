import { useEffect, useRef, useState } from 'react';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import * as icons from '@/app/icons';
import ArrowIcon from '@/public/assets/ui/Arrow';

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

function StepVisualization({ step }: { step: string }) {
  switch (step) {
    case 'genome':
      return (
        <div className='relative h-full w-full p-8 font-mono'>
          {/* DNA Sequence Grid - Exact match from image */}
          <div className='grid gap-2'>
            <motion.div
              className='whitespace-pre text-sm tracking-wider'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className='text-neutral-400'>GGACGATTTCAG</span>
              <br />
              <span className='text-neutral-400'>ACGTGCAGACTGA</span>
              <br />
              <span className='text-neutral-400'>CGTGACGTACGTC</span>
              <br />
              <span className='text-neutral-400'>TAATTAACAGGAA</span>
              <br />
              <span className='text-neutral-400'>...</span>
            </motion.div>
          </div>
        </div>
      );

    case 'motif':
      return (
        <div className='relative h-full w-full p-8'>
          <div className='space-y-4'>
            <div className='font-mono text-sm'>
              {/* Exact motif highlighting from image */}
              <motion.div className='mb-4'>
                <span className='text-neutral-400'>GGACGATTTCAG</span>
                <br />
                <span className='text-neutral-400'>AC</span>
                <span className='font-bold text-blue-500'>GTGCAG</span>
                <span className='text-neutral-400'>ACTGA</span>
                <br />
                <span className='text-neutral-400'>CGTGACGTACGTC</span>
                <br />
                <span className='font-bold text-red-500'>TAATAA</span>
                <span className='text-neutral-400'>TCAGGAA</span>
              </motion.div>
            </div>
          </div>
        </div>
      );

    case 'network':
      return (
        <div className='relative h-full w-full'>
          <svg className='h-full w-full'>
            {/* Gene Regulatory Network - Matching diagram style */}
            <g>
              {/* Create exact network pattern from image */}
              {[
                { x: 100, y: 100 },
                { x: 200, y: 100 },
                { x: 150, y: 180 },
                { x: 100, y: 260 },
                { x: 200, y: 260 },
              ].map((node, i) => (
                <g key={i}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={15}
                    fill='#1E293B'
                    stroke='#475569'
                  />
                  {/* Add connections matching the diagram */}
                  {i < 4 && (
                    <path
                      d={`M ${node.x} ${node.y} L ${
                        i === 0
                          ? '200 100'
                          : i === 1
                            ? '150 180'
                            : i === 2
                              ? '100 260'
                              : '200 260'
                      }`}
                      stroke='#475569'
                      strokeWidth={2}
                      fill='none'
                    />
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>
      );

    case 'clusters':
      return (
        <div className='relative h-full w-full p-8'>
          {/* Cross-Species Cluster Comparison - Matching diagram */}
          <div className='grid grid-cols-2 gap-4'>
            {[
              {
                color: '#3B82F6',
                nodes: [
                  [0, 0],
                  [1, 0],
                  [0, 1],
                ],
              },
              {
                color: '#EC4899',
                nodes: [
                  [0, 0],
                  [1, 0],
                  [1, 1],
                ],
              },
            ].map((species, i) => (
              <motion.div
                key={i}
                className='relative rounded-lg border border-white/10 p-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <svg className='h-full w-full'>
                  <g>
                    {species.nodes.map((pos, j) => (
                      <g key={j}>
                        <circle
                          cx={50 + pos[0] * 50}
                          cy={50 + pos[1] * 50}
                          r={10}
                          fill={species.color}
                          opacity={0.6}
                        />
                        {j < species.nodes.length - 1 && (
                          <line
                            x1={50 + pos[0] * 50}
                            y1={50 + pos[1] * 50}
                            x2={50 + species.nodes[j + 1][0] * 50}
                            y2={50 + species.nodes[j + 1][1] * 50}
                            stroke={species.color}
                            strokeWidth={2}
                            opacity={0.4}
                          />
                        )}
                      </g>
                    ))}
                  </g>
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'proteins':
      return (
        <div className='relative h-full w-full'>
          {/* Protein Structure - Matching diagram style */}
          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className='relative h-64 w-64'>
              <motion.div
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(45deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))',
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                }}
                animate={{
                  borderRadius: [
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                    '70% 30% 30% 70% / 70% 70% 30% 30%',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            </div>
          </motion.div>
        </div>
      );

    case 'virtual-cell':
      return (
        <div className='relative h-full w-full'>
          {/* Virtual Cell Model - Matching final diagram */}
          <div className='absolute inset-0 rounded-full border border-emerald-500/20'>
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
              {/* Add organelles and proteins */}
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
                  }}
                  transition={{
                    duration: organelle.speed,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </motion.div>
          </div>
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
