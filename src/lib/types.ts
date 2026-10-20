export type PropertyStatus = "sale" | "rent";

export type PropertyType = "house" | "apartment" | "plot" | "commercial";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  /** Paisa-derived amount, kept as a number so PKR formatting stays centralised. */
  price: number;
  /** `true` means the price is a monthly rent. */
  isRent: boolean;
  marla: number;
  sqft: number;
  beds: number | null;
  baths: number | null;
  area: string;
  addressLine: string;
  summary: string;
  description: string[];
  features: string[];
  images: string[];
  landmarks: string[];
  featured: boolean;
}

export interface Area {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  speciality: string;
  areas: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  outcome: string;
  body: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string[];
}
