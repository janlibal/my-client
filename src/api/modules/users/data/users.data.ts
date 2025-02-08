import { User } from '../types/users.type'

export const users: User[] = [
  {
    id: 1,
    name: 'Jan Libal',
    email: 'jan.libal@janlibal.com',
    website: 'www.janlibal.com',
    address: {
      city: 'San Fracisco',
      street: '215 Kearny Street',
      zipcode: '94108',
      suite: 'A',
    },
    company: {
      name: 'JanLibalCo',
    },
  },
]
