import ProductSection from './ProductSection';

interface SeraphSectionProps {
  id: string;
  bgColor: string;
}

export default function SeraphSection({ id, bgColor }: SeraphSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Seraph'
      productDescription='Our flagship model for the defense sector.'
      imageSrc='/assets/products/seraph.webp'
      features={[
        {
          title: 'TRANSFORM CRITICAL OPERATIONS',
          description:
            'Maximize the effectiveness of your assets in the most dynamic operational landscapes. Seraph empowers you to make informed decisions, providing unprecedented foresight and strategic advantage in high-stake, complex environments.',
        },
        {
          title: 'ADAPTIVE MODELING',
          description:
            "You're not just keeping pace with time - you're staying ahead of it.",
        },
        {
          title: 'TEMPORAL INSIGHTS',
          description: 'Craft messages that hit harder than any weapon',
        },
      ]}
    />
  );
}
