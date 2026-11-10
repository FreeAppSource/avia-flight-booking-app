export const initialFlightSearch = {
  origin: {
    city: 'Saint-Petersburg',
    country: 'Russia',
    code: 'LED',
  },
  destination: {
    city: 'Seoul',
    country: 'South Korea',
    code: 'ICN',
  },
  departureDate: 'Mon, 14 October',
  departureTimeRange: '00:00 - 23:59',
  arrivalDate: 'Sun, 15 October',
  arrivalTimeRange: '00:00 - 23:59',
  isReturn: true,
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  flightClass: 'Business', // Business, Economy, First
  foodPreference: 'Vegetarian',
  sortBy: 'Recommended',
};

export const suggestedAirports = [
  { city: 'Seoul', country: 'South Korea', code: 'SEL / ICN', airport: 'Incheon International Airport' },
  { city: 'Seville', country: 'Spain', code: 'SVQ', airport: 'San Pablo Airport' },
  { city: 'Semey', country: 'Kazakhstan', code: 'PLX', airport: 'Semey Airport' },
  { city: 'Tacoma', country: 'Seattle, USA', code: 'SEA', airport: 'Seattle-Tacoma Int Airport' },
  { city: 'Saint-Petersburg', country: 'Russia', code: 'LED', airport: 'Pulkovo Airport' },
  { city: 'San Francisco', country: 'USA', code: 'SFO', airport: 'San Francisco International' },
  { city: 'New York', country: 'USA', code: 'JFK', airport: 'John F. Kennedy Int Airport' },
  { city: 'Tokyo', country: 'Japan', code: 'HND / NRT', airport: 'Haneda Airport' },
];

export const flightsList = [
  {
    id: 'FL-4739',
    airline: 'Jet Airways',
    flightNumber: '#4739374hfjdj',
    logo: require('../assets/images/airline_logo.png'),
    departureTime: '04:55',
    departureCode: 'LED',
    departureCity: 'Saint-Petersburg',
    arrivalTime: '11:20',
    arrivalCode: 'ICN',
    arrivalCity: 'Seoul',
    duration: '6h 25m',
    type: 'Direct flight',
    price: 1250,
    currency: '$',
    recommended: true,
  },
  {
    id: 'FL-9240',
    airline: 'Korean Air',
    flightNumber: '#KE9240',
    logo: require('../assets/images/airline_logo.png'),
    departureTime: '08:30',
    departureCode: 'LED',
    departureCity: 'Saint-Petersburg',
    arrivalTime: '15:45',
    arrivalCode: 'ICN',
    arrivalCity: 'Seoul',
    duration: '6h 15m',
    type: 'Direct flight',
    price: 1380,
    currency: '$',
    recommended: false,
  },
  {
    id: 'FL-2500',
    airline: 'Aeroflot',
    flightNumber: '#SU2500',
    logo: require('../assets/images/airline_logo.png'),
    departureTime: '12:10',
    departureCode: 'LED',
    departureCity: 'Saint-Petersburg',
    arrivalTime: '19:20',
    arrivalCode: 'ICN',
    arrivalCity: 'Seoul',
    duration: '6h 10m',
    type: '1 Stop',
    price: 1190,
    currency: '$',
    recommended: false,
  },
];

export const destinationInfo = {
  city: 'Seoul',
  country: 'South Korea',
  weather: '+9°C , SUNNY',
  localTime: '21:48 (GMT +9)',
  currency: 'KRW',
  description:
    'Seoul is considered a leading and rising global big city, resulting from an economic boom called the Miracle on the Han River.',
};

export const attractions = [
  {
    id: 'att-1',
    title: 'National Museum of Korea',
    subtitle: 'ATTRACTIONS · MUST SEE',
    image: require('../assets/images/attraction_museum.png'),
    rating: '4.9',
  },
  {
    id: 'att-2',
    title: 'Gyeongbokgung Palace',
    subtitle: 'HISTORIC LANDMARK',
    image: require('../assets/images/attraction_1.png'),
    rating: '4.8',
  },
  {
    id: 'att-3',
    title: 'N Seoul Tower',
    subtitle: 'CITY OVERLOOK',
    image: require('../assets/images/attraction_2.png'),
    rating: '4.7',
  },
  {
    id: 'att-4',
    title: 'Bukchon Hanok Village',
    subtitle: 'CULTURE & WALKING',
    image: require('../assets/images/attraction_3.png'),
    rating: '4.8',
  },
  {
    id: 'att-5',
    title: 'Dongdaemun Design Plaza',
    subtitle: 'ARCHITECTURE & ART',
    image: require('../assets/images/attraction_4.png'),
    rating: '4.6',
  },
];

// Seat map layout rows 12-18
export const initialSeats = [
  { row: 12, col: 'A', class: 'Business', status: 'occupied' },
  { row: 12, col: 'B', class: 'Business', status: 'available' },
  { row: 12, col: 'C', class: 'Business', status: 'occupied' },
  { row: 12, col: 'D', class: 'Business', status: 'available' },
  { row: 12, col: 'E', class: 'Business', status: 'available' },
  { row: 12, col: 'F', class: 'Business', status: 'occupied' },

  { row: 14, col: 'A', class: 'Business', status: 'available' },
  { row: 14, col: 'B', class: 'Business', status: 'available' },
  { row: 14, col: 'C', class: 'Business', status: 'occupied' },
  { row: 14, col: 'D', class: 'Business', status: 'available' },
  { row: 14, col: 'E', class: 'Business', status: 'occupied' },
  { row: 14, col: 'F', class: 'Business', status: 'available' },

  { row: 15, col: 'A', class: 'Business', status: 'selected' }, // Sketch: 15A Selected
  { row: 15, col: 'B', class: 'Business', status: 'available' },
  { row: 15, col: 'C', class: 'Business', status: 'available' },
  { row: 15, col: 'D', class: 'Business', status: 'occupied' },
  { row: 15, col: 'E', class: 'Business', status: 'available' },
  { row: 15, col: 'F', class: 'Business', status: 'available' },

  { row: 16, col: 'Economy', class: 'Economy', status: 'occupied' },
  { row: 16, col: 'B', class: 'Economy', status: 'available' },
  { row: 16, col: 'C', class: 'Economy', status: 'available' },
  { row: 16, col: 'D', class: 'Economy', status: 'available' },
  { row: 16, col: 'E', class: 'Economy', status: 'occupied' },
  { row: 16, col: 'F', class: 'Economy', status: 'available' },

  { row: 17, col: 'A', class: 'Economy', status: 'available' },
  { row: 17, col: 'B', class: 'Economy', status: 'occupied' },
  { row: 17, col: 'C', class: 'Economy', status: 'available' },
  { row: 17, col: 'D', class: 'Economy', status: 'available' },
  { row: 17, col: 'E', class: 'Economy', status: 'available' },
  { row: 17, col: 'F', class: 'Economy', status: 'available' },

  { row: 18, col: 'A', class: 'Economy', status: 'available' },
  { row: 18, col: 'B', class: 'Economy', status: 'available' },
  { row: 18, col: 'C', class: 'Economy', status: 'occupied' },
  { row: 18, col: 'D', class: 'Economy', status: 'available' },
  { row: 18, col: 'E', class: 'Economy', status: 'available' },
  { row: 18, col: 'F', class: 'Economy', status: 'occupied' },
];
