import { useMemo } from 'react';

import { motion } from 'framer-motion';

import { DNASequenceViz } from '../visualizations/DNASequenceViz';
import { NetworkViz } from '../visualizations/NetworkViz';
import {
  generateClusterConnections,
  generateClusteredNodes,
  generateNodes,
  generateOrganelles,
  generateProteins,
  generateRegulatedConnections,
} from './helpers';

interface StepVisualizationProps {
  step: string;
}

export function StepVisualization({ step }: StepVisualizationProps) {
  switch (step) {
    case 'genome':
      return (
        <div className='relative h-full w-full'>
          <DNASequenceViz
            sequence={Array(20)
              .fill(
                'GGACGATTTCAGACGTGCAGACTGACGTGACGTACGTCTAATTAACAGGAA'.split('')
              )
              .flat()}
            annotations={[
              {
                start: 15,
                end: 25,
                color: 'rgb(59, 130, 246)',
                label: 'TATA Box',
                confidence: 0.95,
              },
            ]}
            showBaseLabels={true}
            showBackbone={true}
            animateTranscription={true}
            showConfidenceScores={true}
            height={400}
            width={800}
          />
          {/* Modern floating annotations */}
          <div className='pointer-events-none absolute inset-0'>
            {/* Confidence score indicator */}
            <motion.div
              className='absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-blue-500/10 p-2 backdrop-blur-sm'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className='h-2 w-16 rounded-full bg-white/10'>
                <motion.div
                  className='h-full rounded-full bg-blue-500'
                  initial={{ width: '0%' }}
                  animate={{ width: '95%' }}
                  transition={{ duration: 1 }}
                />
              </div>
              <span className='text-xs text-blue-200'>95% confidence</span>
            </motion.div>

            {/* Sequence features */}
            <div className='absolute bottom-4 left-4 space-y-2'>
              {[
                {
                  label: 'GC Content',
                  value: '52%',
                  color: 'rgb(59, 130, 246)',
                },
                {
                  label: 'Methylation',
                  value: '23%',
                  color: 'rgb(236, 72, 153)',
                },
                {
                  label: 'Conservation',
                  value: '87%',
                  color: 'rgb(16, 185, 129)',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className='flex items-center gap-2 text-xs'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className='h-2 w-2 rounded-full'
                    style={{ backgroundColor: feature.color }}
                  />
                  <span className='text-white/60'>{feature.label}</span>
                  <span className='font-mono text-white'>{feature.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'motif':
      return (
        <div className='relative h-full w-full'>
          <div className='absolute inset-0 flex'>
            {/* Left side: DNA sequence with motifs */}
            <div className='w-2/3'>
              <DNASequenceViz
                sequence={Array(20)
                  .fill(
                    'GGACGATTTCAGACGTGCAGACTGACGTGACGTACGTCTAATTAACAGGAA'.split(
                      ''
                    )
                  )
                  .flat()}
                annotations={[
                  {
                    start: 20,
                    end: 40,
                    color: 'rgb(59, 130, 246)',
                    label: 'GTGCAG motif',
                    type: 'transcriptionFactor',
                    conservation: 0.92,
                  },
                  {
                    start: 45,
                    end: 65,
                    color: 'rgb(236, 72, 153)',
                    label: 'miRNA binding site',
                    type: 'miRNA',
                    conservation: 0.88,
                  },
                ]}
                showProteinBinding={true}
                showConservation={true}
                showEvolutionaryHistory={true}
              />
            </div>

            {/* Right side: 3D protein binding visualization */}
            <div className='relative w-1/3'>
              <motion.div
                className='absolute inset-4 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20'
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* Protein binding site markers */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className='absolute h-2 w-2 rounded-full bg-white/50'
                    style={{
                      left: `${30 + Math.sin(i * Math.PI * 0.4) * 40}%`,
                      top: `${30 + Math.cos(i * Math.PI * 0.4) * 40}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      );

    case 'network':
      return (
        <div className='relative h-full w-full'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' />
          <NetworkViz
            nodes={generateNodes(12)}
            connections={generateRegulatedConnections(12)}
            showLabels={true}
            showDirectionality={true}
            showStrengthIndicators={true}
            showForceSimulation={true}
            nodeTypes={{
              transcriptionFactor: 'rgb(59, 130, 246)',
              enhancer: 'rgb(236, 72, 153)',
              promoter: 'rgb(16, 185, 129)',
              gene: 'rgb(251, 191, 36)',
            }}
          />

          {/* Network statistics overlay */}
          <div className='absolute right-4 top-4 space-y-2'>
            {[
              { label: 'Network Density', value: '0.42' },
              { label: 'Avg. Path Length', value: '2.8' },
              { label: 'Modularity', value: '0.68' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className='rounded-lg bg-white/5 px-3 py-2 backdrop-blur-sm'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className='text-xs text-white/60'>{stat.label}</div>
                <div className='font-mono text-sm text-white'>{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'clusters':
      return (
        <div className='relative h-full w-full'>
          <NetworkViz
            nodes={generateClusteredNodes(15)}
            connections={generateClusterConnections(15)}
            showClusters={true}
            clusterColors={[
              'rgb(59, 130, 246)',
              'rgb(236, 72, 153)',
              'rgb(16, 185, 129)',
            ]}
            showEvolutionaryScores={true}
          />
          <div className='pointer-events-none absolute inset-0'></div>
        </div>
      );

    case 'protein':
      return (
        <div className='relative h-full w-full'>
          <NetworkViz
            nodes={generateNodes(15).map((node) => ({
              ...node,
              size: node.size * 1.5,
              color: 'rgb(16, 185, 129)',
            }))}
            connections={Array(25)
              .fill(0)
              .map(() => ({
                source: { x: Math.random() * 100, y: Math.random() * 100 },
                target: { x: Math.random() * 100, y: Math.random() * 100 },
                strength: Math.random() * 0.4 + 0.6,
              }))}
          />
        </div>
      );

    case 'virtual-cell':
      return (
        <div className='relative h-full w-full bg-zinc-950'>
          <motion.div
            className='absolute inset-0 rounded-full'
            style={{
              background: `
                radial-gradient(
                  circle at center,
                  transparent 48%,
                  rgba(16, 185, 129, 0.05) 49%,
                  rgba(16, 185, 129, 0.05) 51%,
                  transparent 53%
                )
              `,
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className='absolute h-4 w-1.5 bg-emerald-500/20'
                style={{
                  left: `${50 + 35 * Math.cos((i * Math.PI) / 6)}%`,
                  top: `${50 + 35 * Math.sin((i * Math.PI) / 6)}%`,
                  transform: `rotate(${i * 30}deg)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

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
        </div>
      );

    default:
      return null;
  }
}
