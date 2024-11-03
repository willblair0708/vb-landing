import ProductSection from './ProductSection';

interface LumenSectionProps {
  id: string;
  bgColor: string;
}

export default function LumenSection({ id, bgColor }: LumenSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Lumen'
      productDescription='Our flagship model for the private sector.'
      imageSrc='/assets/products/lumen.webp'
      features={[
        {
          title: 'TRUE SCALE',
          description:
            "Researchers at Aaru have developed a map of not just every person that exists, but every combination of person that could exist. That's more permutations than atoms in the universe squared.",
        },
        {
          title: 'REACH THE UNREACHABLE',
          description: 'Configurable audiences allows for:',
          bulletPoints: [
            'Simulating C-suite executives, corporate rulings/situations, and federal organizations',
            'Simulating unique customer segments',
            'Identifying true target markets',
            'Instantaneous product innovation',
            'Hyper-targeted marketing',
          ],
        },
      ]}
    />
  );
}
