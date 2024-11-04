import { useEffect, useRef, useState } from 'react';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { StepVisualization } from './StepVisualization';

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
  details?: Record<string, string>;
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
    label: 'Genomic Language Models',
    description:
      'Our gLMs process raw DNA sequences like language, identifying regulatory elements, promoters, and enhancers with 95% accuracy. This direct DNA-to-function prediction eliminates costly RNA sequencing.',
    color: 'rgb(59, 130, 246)',
    visualization: 'dna-sequence',
    details: {
      accuracy: '95%',
      dataPoints: '1.2B',
      coverage: 'Full Genome',
    },
  },
  {
    id: 'motif',
    label: 'Regulatory Networks',
    description:
      'Advanced deep learning identifies conserved genetic programs and transcription factor binding sites across species, mapping the fundamental logic of cellular control.',
    color: 'rgb(16, 185, 129)',
    visualization: 'motif-pattern',
    details: {
      motifs: '250K+',
      species: '100+',
      confidence: '92%',
    },
  },
  {
    id: 'network',
    label: 'Cross-Species Analysis',
    description:
      'Evolutionary comparison across species reveals conserved regulatory networks, enabling robust predictions for any genome. Our models learn from billions of years of natural optimization.',
    color: 'rgb(139, 92, 246)',
    visualization: 'network',
    details: {
      connections: '1M+',
      conservation: '85%',
      predictions: '99.9%',
    },
  },
  {
    id: 'clusters',
    label: 'Cell-Type Prediction',
    description:
      'Generate personalized predictions for any genome and build cell-type specific models without experimental data.',
    color: 'rgb(236, 72, 153)', // pink
    visualization: 'clusters',
  },
  {
    id: 'proteins',
    label: 'Digital Biology Platform',
    description:
      'Comprehensive modeling of cellular behavior from genetic code to protein interactions.',
    color: 'rgb(234, 179, 8)', // yellow
    visualization: 'proteins',
  },
  {
    id: 'virtual-cell',
    label: 'Virtual Cell Model',
    description:
      'Complete digital cell simulation powered by genomic understanding and evolutionary insights.',
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
                Bio AI Revolution
              </span>
            </motion.div>

            <h2 className='font-book text-4xl leading-tight tracking-tight text-white lg:text-5xl'>
              <span className='bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent'>
                Decoding Nature's
              </span>
              <br />
              Programming Language
            </h2>

            <p className='text-lg leading-relaxed text-neutral-300'>
              Our genomic language models learn to read and interpret DNA like
              GPT learns human language, creating a fundamental shift in
              biological understanding. By analyzing genetic code across
              species, we're digitizing the entire gene-to-cell pipeline.
            </p>

            {/* Add key metrics */}
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              {[
                { label: 'Prediction Accuracy', value: '95%' },
                { label: 'Cost Reduction', value: '90%' },
                { label: 'Species Coverage', value: '100+' },
              ].map((metric, i) => (
                <div
                  key={i}
                  className='rounded-xl border border-white/10 bg-white/5 p-4 text-center'
                >
                  <div className='text-2xl font-semibold text-white'>
                    {metric.value}
                  </div>
                  <div className='text-sm text-neutral-400'>{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Enhanced Step Description */}
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
