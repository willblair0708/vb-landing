// Force generation functions
export const generateVanDerWaalsForces = () => ({
  attraction: Array(10).fill(0).map(() => ({
    distance: Math.random() * 5 + 2,
    strength: Math.random() * 0.5,
  })),
  repulsion: Array(10).fill(0).map(() => ({
    distance: Math.random() * 3 + 1,
    strength: Math.random() * 0.8,
  })),
});

export const generateElectrostaticForces = () => ({
  positive: Array(5).fill(0).map(() => ({
    charge: Math.random() * 2 + 1,
    position: [Math.random() * 400, Math.random() * 400],
  })),
  negative: Array(5).fill(0).map(() => ({
    charge: -(Math.random() * 2 + 1),
    position: [Math.random() * 400, Math.random() * 400],
  })),
});

export const generateHydrophobicForces = () => ({
  clusters: Array(3).fill(0).map(() => ({
    size: Math.random() * 30 + 20,
    position: [Math.random() * 400, Math.random() * 400],
    strength: Math.random() * 0.8 + 0.2,
  })),
});

export const generateHydrogenBondNetwork = () => ({
  donors: Array(8).fill(0).map(() => ({
    position: [Math.random() * 400, Math.random() * 400],
    strength: Math.random() * 0.7 + 0.3,
  })),
  acceptors: Array(8).fill(0).map(() => ({
    position: [Math.random() * 400, Math.random() * 400],
    strength: Math.random() * 0.7 + 0.3,
  })),
});

export const generateNodes = (count: number) => {
  return Array(count).fill(0).map((_, i) => ({
    id: `node-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    type: i === 0 ? 'root' : 'node',
  }));
};

export const generateOrganelles = (count: number) => {
  return Array(count).fill(0).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 20,
    speed: Math.random() * 10 + 5,
    delay: Math.random() * 2,
  }));
};

export const generateProteins = (count: number) => {
  return Array(count).fill(0).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 15 + 10,
  }));
};

// Molecular force calculations
export const calculateVanDerWaalsForce = (distance: number, sigma: number, epsilon: number) => {
  // Lennard-Jones potential for VDW forces
  const term1 = Math.pow(sigma / distance, 12);
  const term2 = Math.pow(sigma / distance, 6);
  return 4 * epsilon * (term1 - term2);
};

export const calculateElectrostaticForce = (charge1: number, charge2: number, distance: number, dielectricConstant: number = 80) => {
  // Coulomb's law with dielectric constant of water
  const k = 8.99e9; // Coulomb's constant
  return (k * charge1 * charge2) / (dielectricConstant * Math.pow(distance, 2));
};

export const calculateHydrogenBondStrength = (distance: number, angle: number) => {
  // Distance and angle dependent H-bond strength
  const optimalDistance = 2.8; // Angstroms
  const optimalAngle = 180; // degrees
  const distanceComponent = Math.exp(-(Math.pow(distance - optimalDistance, 2)));
  const angleComponent = Math.cos(angle * Math.PI / 180);
  return distanceComponent * angleComponent;
};

// Enhanced DNA path generation
export const generateDNAPath = () => {
  const points: string[] = [];
  const height = 400;
  const width = 800;
  const turns = 12;
  const segments = turns * 40; // Higher resolution
  const majorGrooveWidth = 22; // Angstroms
  const minorGrooveWidth = 12; // Angstroms
  const helixPitch = 34; // Angstroms per turn
  
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const x = width * 0.1 + (width * 0.8 * t);
    
    // B-form DNA parameters
    const majorGrooveDepth = Math.sin(t * Math.PI * turns * 2) * majorGrooveWidth;
    const minorGrooveDepth = Math.sin(t * Math.PI * turns * 2 + Math.PI) * minorGrooveWidth;
    
    // Calculate backbone positions
    const y1 = height/2 + majorGrooveDepth;
    const y2 = height/2 + minorGrooveDepth;
    
    points.push(i === 0 ? `M ${x} ${y1}` : `L ${x} ${y1}`);
    
    // Base pair connections with proper spacing
    if (i % 4 === 0) { // ~10.5 base pairs per turn
      const baseSpacing = helixPitch / 10.5;
      points.push(`M ${x} ${y1} L ${x} ${y2}`);
    }
  }
  
  return points.join(' ');
};

export const generateConnectionPath = (connection: {
  source: { x: number; y: number };
  target: { x: number; y: number };
  strength: number;
}) => {
  const { source, target, strength } = connection;
  
  // Calculate control point for quadratic curve
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;
  const offset = strength * 50; // Curve intensity based on connection strength
  
  // Generate curved path
  return `M ${source.x} ${source.y} Q ${midX} ${midY - offset} ${target.x} ${target.y}`;
};

// Network generation with biological constraints
export const generateRegulatedConnections = (count: number) => {
  const maxOutDegree = 5; // Max number of targets per TF
  const minBindingAffinity = 0.4; // Minimum binding strength
  
  return Array(count).fill(0).map((_, i) => {
    const outDegree = Math.min(Math.floor(Math.random() * maxOutDegree) + 1, count - 1);
    return Array(outDegree).fill(0).map(() => ({
      source: { 
        x: 30 + Math.random() * 40, // TFs tend to cluster
        y: Math.random() * 100 
      },
      target: { 
        x: Math.random() * 100,
        y: Math.random() * 100 
      },
      strength: Math.random() * (1 - minBindingAffinity) + minBindingAffinity,
      type: Math.random() > 0.7 ? 'activation' : 'repression'
    }));
  }).flat();
};

// Cluster generation with biological parameters
export const generateClusteredNodes = (count: number) => {
  const clusters = 3; // Typical number of major cell types
  const hubFraction = 0.15; // Fraction of nodes that are hubs
  const hubConnectivity = 0.6; // Relative connectivity of hubs
  
  return Array(count).fill(0).map((_, i) => {
    const cluster = Math.floor(i / (count / clusters));
    const isHub = i < count * hubFraction;
    const centerX = 30 + cluster * 25;
    const centerY = 50;
    
    return {
      id: `node-${i}`,
      x: centerX + (Math.random() - 0.5) * (isHub ? 15 : 25),
      y: centerY + (Math.random() - 0.5) * (isHub ? 15 : 25),
      size: isHub ? 12 : Math.random() * 6 + 4,
      color: `hsl(${120 + cluster * 120}, 70%, 50%)`,
      type: isHub ? 'hub' : 'node',
      connectivity: isHub ? hubConnectivity : Math.random() * 0.3
    };
  });
};

// More accurate connection generation
export const generateClusterConnections = (count: number) => {
  const nodes = generateClusteredNodes(count);
  const preferentialAttachment = 0.7; // Tendency to connect to highly connected nodes
  
  return nodes.flatMap((node) => {
    const connectionCount = Math.floor(node.connectivity * 5);
    return Array(connectionCount).fill(0).map(() => {
      const target = nodes[Math.floor(Math.random() * nodes.length)];
      const intraClusterStrength = node.type === target.type ? 0.8 : 0.4;
      
      return {
        source: { x: node.x, y: node.y },
        target: { x: target.x, y: target.y },
        strength: intraClusterStrength * (1 + target.connectivity * preferentialAttachment),
      };
    });
  });
}; 