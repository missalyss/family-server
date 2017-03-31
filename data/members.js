var partners = require('./partners.js')

var family = [
  {
    name: 'Andrea',
    id: 0,
    age: 52,
    current_city: 'SLC',
    married: true,
    partner: partners[0]
  },
  {
    name: 'Jessi',
    id: 1,
    age: 30,
    current_city: 'SLC',
    married: true,
    partner: partners[1]
  },
  {
    name: 'Hayley',
    id: 2,
    age: 28,
    current_city: 'Phoenix',
    married: true,
    partner: partners[2]
  },
  {
    name: 'Alyssa',
    id: 3,
    age: 26,
    current_city: 'Seattle',
    married: false,
    partner: partners[3]
  },
  {
    name: 'Emerson',
    id: 4,
    age: 24,
    current_city: 'SLC',
    married: true,
    partner: partners[4]
  },
  {
    name: 'Spencer',
    id: 5,
    age: 21,
    current_city: 'SLC',
    married: false,
    partner: partners[5]
  }
]

module.exports = family
