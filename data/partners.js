var members = require('./members.js')

var partners = [
  {
    name: 'Steve',
    id: 0,
    age: 52,
    partner_to: members[0]
  },
  {
    name: 'Ryan',
    id: 1,
    age: 30,
    partner_to: members[1]
  },
  {
    name: 'Brock',
    id: 2,
    age: 28,
    partner_to: members[2]
  },
  {
    name: 'Brendon',
    id: 3,
    age: 32,
    partner_to: members[3]
  },
  {
    name: 'Sage',
    id: 4,
    age: 26,
    partner_to: members[4]
  },
  {
    name: 'Meghan',
    id: 5,
    age: 23,
    partner_to: members[5]
  }
]

module.exports = partners
