export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/event/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
];

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
};

export const categories = [
  {
    id: 1,
    name: "Tech"
  },
  {
    id: 2,
    name: "Business"
  },
  {
    id: 3,
    name: "Entertainment"
  },
  {
    id: 4,
    name: "Charity"
  },
];