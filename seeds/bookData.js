const { Book } = require('../models');

const bookData = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description:
      'A prelude to The Lord of the Rings, The Hobbit follows Bilbo Baggins as he embarks on an unexpected journey filled with dwarves, dragons, and a treasure that could change his life forever.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0547928227',
    user_id: 1,
  },
  {
    title: 'Harry Potter and the Sorcerers Stone',
    author: 'J.K. Rowling',
    description:
      'The first book in the Harry Potter series introduces readers to a young wizard named Harry Potter who discovers his magical heritage and begins his education at Hogwarts School of Witchcraft and Wizardry.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0590353427',
    user_id: 3,
  },
  {
    title: 'A Game of Thrones',
    author: 'George R.R. Martin',
    description:
      'The first book in the A Song of Ice and Fire series, A Game of Thrones sets the stage for a battle for the Iron Throne, involving noble families, knights, and mythical creatures.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0553593716',
    user_id: 5,
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    description:
      'A gripping tale of mystery and intrigue, this novel follows journalist Mikael Blomkvist and hacker Lisbeth Salander as they uncover dark secrets about a wealthy Swedish family.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0307454546',
    user_id: 2,
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    description:
      'Gone Girl explores the complexities of marriage and the media’s role in shaping public perception, with a plot that twists and turns as the truth about a woman’s disappearance is revealed.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0307588371',
    user_id: 4,
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    description:
      'A symbologist and a cryptologist unravel clues hidden in famous works of art to solve a murder mystery that could change the course of history.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0307474278',
    user_id: 1,
  },
  {
    title: 'The Hound of the Baskervilles',
    author: 'Arthur Conan Doyle',
    description:
      'One of the most famous Sherlock Holmes stories, where the detective investigates the legend of a supernatural hound that haunts the Baskerville family.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-1505255607',
    user_id: 4,
  },
  {
    title: 'Murder on the Orient Express',
    author: 'Agatha Christie',
    description:
      'Hercule Poirot solves a murder case aboard the luxurious Orient Express train, where every passenger is a suspect.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0062693662',
    user_id: 2,
  },
  {
    title: 'The Big Sleep',
    author: 'Raymond Chandler',
    description:
      'In this classic hardboiled mystery, private detective Philip Marlowe navigates a complex web of deceit and murder in 1930s Los Angeles.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0394758282',
    user_id: 5,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    description:
      'Set on the desert planet Arrakis, Dune follows Paul Atreides as he navigates political intrigue, battles for control of the planet, and discovers his destiny.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0441013593',
    user_id: 3,
  },
  {
    title: 'Enders Game',
    author: 'Orson Scott Card',
    description:
      'In a future where Earth is at war with an alien race, young Ender Wiggin is trained in a battle school to become humanitys greatest military leader.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0812550702',
    user_id: 1,
  },
  {
    title: 'The Left Hand of Darkness',
    author: 'Ursula K. Le Guin',
    description:
      'On a distant planet where inhabitants can change gender, an ambassador from Earth must navigate cultural misunderstandings and political intrigue.',
    cover_img: '../public/images/leatherCover.jpg',
    status: 'available',
    isbn: '978-0441478125',
    user_id: 2,
  },
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
