import bridalSetImage from '../../assets/bridal/WhatsApp Image 2026-06-15 at 6.50.46 PM.jpeg';
import braceletImage from '../../assets/brackets/WhatsApp Image 2026-06-16 at 3.04.22 PM.jpeg';
import necklaceImage from '../../assets/neckales/WhatsApp Image 2026-06-16 at 2.40.53 PM.jpeg';
import earringsImage from '../../assets/water/eeee.jpeg';
import ringImage from '../../assets/water/fff.jpeg';
import customizedImage from '../../assets/water/customized.jpeg';

export const categories = [
  { id: 'c1', name: 'Earrings', emoji: 'E', image: earringsImage, count: 42 },
  { id: 'c2', name: 'Necklaces', emoji: 'N', image: necklaceImage, count: 35 },
  { id: 'c3', name: 'Bracelets', emoji: 'B', image: braceletImage, count: 28 },
  { id: 'c4', name: 'Rings', emoji: 'R', image: ringImage, count: 50 },
  { id: 'c5', name: 'Bridal Collections', emoji: 'BS', image: bridalSetImage, count: 4 },
  { id: 'c6', name: 'Customized Jewelry', emoji: 'C', image: customizedImage, count: 4 },
];

export const testimonials = [
  {
    id: 't1',
    name: 'Priya Sharma',
    location: 'Mumbai, IN',
    rating: 5,
    text: 'Absolutely love the earrings I ordered! The quality is amazing and it came in such beautiful packaging.',
  },
  {
    id: 't2',
    name: 'Anita Desai',
    location: 'Delhi, IN',
    rating: 5,
    text: 'The customized necklace was exactly what I wanted. Thank you so much for the quick delivery and great service.',
  },
  {
    id: 't3',
    name: 'Meera Reddy',
    location: 'Bangalore, IN',
    rating: 4,
    text: 'Beautiful craftsmanship. The bracelet looks even better in person. Will definitely order again.',
  },
];
