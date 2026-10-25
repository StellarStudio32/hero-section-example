export interface Stay {
  id: string;
  city: string;
  country: string;
  locationLabel: string;
  dateRange: string;
  defaultCheckIn: string;
  defaultCheckOut: string;
  pricePerNight: number;
  currency: string;
  architect: string;
  yearBuilt: number;
  sqft: number;
  style: string;
  rating: number;
  reviewsCount: number;
  guestsMax: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  gallery: string[];
  tagline: string;
  description: string;
  curatorNotes: string;
  amenities: string[];
  lat: number;
  lng: number;
}

export interface SearchState {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  pets: number;
}

export type ViewMode = 'framed' | 'fullscreen';
