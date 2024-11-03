export interface JobListing {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  about: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string;
}

export const jobs: JobListing[] = [
  {
    id: 'research-engineer',
    title: 'Research Engineer',
    location: 'New York City',
    type: 'In-Person',
    salary: '$180,000 - $500,000 per year',
    about:
      'Aaru is building simulation engines that meaningfully predict the future...',
    overview:
      "As a research engineer, you will work with the Aaru research team to develop novel approaches to solving fundamental problems within our domain of prediction, using core technologies like language models and agents alongside more traditional machine learning and deep learning techniques. You'll have an explicit focus on the usage of artificial intelligence agents as simulation tools, building and iterating upon our simulation technology.",
    responsibilities: [
      'Build and iterate upon existing simulation models to improve accuracy, speed, and consistency',
      'Develop novel research approaches to improve upon simulation models',
      'Design experiments and evaluations for testing research approaches',
      'Manage experiments, analyze results, and add them to internal documentation',
      'Communicate results internally and externally',
      'Collaborate with backend and frontend team on deployment and usage',
      'Publish research papers',
    ],
    qualifications: [
      "Bachelor's degree in Computer Science / Statistics / Math strongly preferred, Master's degree or PhD in related fields preferred if possible",
      'Interested in the practical application of artificial intelligence for simulation and modeling',
      '1–4 years of experience in AI or ML research',
      'Publications at venues such as ICLR, NeurIPS, ICML, etc preferred',
      'Very strong implementation skills',
      'Experience with LLMs and agents',
      'Problem-solving and analytical skills',
      'Strong attention to detail and ability to work independently',
    ],
    benefits:
      "This position is eligible for Aaru's discretionary annual incentive programs and stock options.",
  },
  {
    id: 'full-stack-engineer',
    title: 'Full Stack Engineer',
    location: 'New York City',
    type: 'In-Person',
    salary: '$160,000 - $200,000 per year',
    about:
      'Aaru is building simulation engines that meaningfully predict the future...',
    overview:
      'As a Full Stack Engineer at Aaru, you will play a critical role in developing and maintaining our cutting-edge simulation engines. You will collaborate with our research and engineering teams to build robust, scalable, and user-friendly applications that drive our predictive technologies forward.',
    responsibilities: [
      'Design, build, and maintain responsive and interactive front-end interfaces using React',
      'Implement and manage server-side logic using Node.js and FastAPI',
      'Develop and integrate RESTful APIs',
      'Design and optimize databases to ensure efficient data storage and retrieval',
      'Work closely with researchers, designers, and other engineers',
      'Identify and address performance bottlenecks',
      'Ensure applications are secure and comply with industry standards',
      'Stay updated with the latest industry standards and technologies',
      'Write unit and integration tests, and manage deployment pipelines',
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, Engineering, or a related field strongly preferred",
      '3+ years of experience in full stack development',
      'Strong proficiency in JavaScript, TypeScript, or similar languages',
      'Experience with front-end frameworks and libraries',
      'Knowledge of back-end frameworks and RESTful API design',
      'Familiarity with database technologies (SQL and NoSQL)',
      'Experience with version control systems',
    ],
    benefits:
      "This position is eligible for Aaru's discretionary annual incentive programs and stock options.",
  },
];
