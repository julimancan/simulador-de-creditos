export const paymentFrequencies = [
  {
    id: 1,
    name: 'Semanal',
    value: 7
  },
  {
    id: 2,
    name: 'Quincenal',
    value: 15
  },
  {
    id: 3,
    name: 'Mensual',
    value: 30
  }
] as const;

type PaymentFrequencies = typeof paymentFrequencies;
export type PaymentTypes = PaymentFrequencies[number]['name'];

export const vehicles = {
  motorcycle: [
    { id: '1', name: 'Sport Bike 2000', price: 5000, image: 'https://images.freeimages.com/images/large-previews/947/motorcycle-1311319.jpg?fmt=webp&w=400' },
    { id: '2', name: 'Cruiser 1500', price: 7000, image: 'https://images.freeimages.com/images/large-previews/a49/moto-cross-1411273.jpg?fmt=webp&w=400/' },
    { id: '3', name: 'Adventure 3000', price: 9000, image: 'https://images.freeimages.com/images/large-previews/a74/motorcycle-1449494.jpg?fmt=webp&w=500/' },
  ],
  eBike: [
    { id: '4', name: 'City Rider', price: 2000, image: 'https://media.istockphoto.com/id/1415317051/photo/black-electric-bike-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=KLlFOJEFWPpSDe9TWB2kqGKS2GuvNp_mhe7y53wnIfA=' },
    { id: '5', name: 'Mountain Explorer', price: 2500, image: 'https://media.istockphoto.com/id/1429417091/photo/electric-bicycle-sharing-service.jpg?s=612x612&w=0&k=20&c=74paJtQxOEcRt0GvRBvy-JmDdc8tiYv-ZyVQqcN3I_s=' },
    { id: '6', name: 'Folding Commuter', price: 1800, image: 'https://media.istockphoto.com/id/1429417091/photo/electric-bicycle-sharing-service.jpg?s=612x612&w=0&k=20&c=74paJtQxOEcRt0GvRBvy-JmDdc8tiYv-ZyVQqcN3I_s=' },
  ]
}