import ProductSection from './ProductSection';

interface DynamoSectionProps {
  id: string;
  bgColor: string;
}

export default function DynamoSection({ id, bgColor }: DynamoSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Dynamo'
      productDescription='Our flagship model for political simulation.'
      imageSrc='/assets/products/dynamo.webp'
      features={[
        {
          title: 'CORE OF SIMULATION',
          description:
            'Dynamo is a multi-agent system that recreates the world using the same principles that govern reality.',
        },
        {
          title: 'GROUND-UP DESIGN',
          description:
            'Dynamo simulates humanity from the ground up. By factoring in hundreds demographic traits, psychographic profiles, and cognitive drivers, Aaru sets a new bar for accuracy.',
        },
      ]}
    />
  );
}
