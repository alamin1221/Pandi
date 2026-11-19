// Site-wide settings and chapter registry.
// Change chapter names here and they update in the navigation + chapter menu.

export const settings = {
  name: 'Pandi',
  siteTitle: 'A Little World for Pandi',
  footer: 'Made with care, just for you.',
  transitionDuration: 620,
  quietMomentDelay: 2600,
  hiddenStarMessage:
    'You found the little hidden star. I hope today holds a small surprise just for you. ✨',
};

export const chapters = [
  { id: 'welcome', number: 1, title: 'The Little Surprise', short: 'The Little Surprise', icon: '🌙' },
  { id: 'birthday', number: 2, title: 'Happy Birthday, Pandi', short: 'Happy Birthday', icon: '🎂' },
  { id: 'memories', number: 3, title: 'Little Memories of You', short: 'Little Memories', icon: '📸' },
  { id: 'timeline', number: 4, title: 'A Few Moments Along the Way', short: 'Along the Way', icon: '🕰️' },
  { id: 'secret', number: 5, title: 'A Secret Envelope', short: 'A Secret Envelope', icon: '💌' },
  { id: 'letter', number: 6, title: 'A Letter for You', short: 'A Letter for You', icon: '✉️' },
  { id: 'open-when', number: 7, title: 'Open When...', short: 'Open When...', icon: '💭' },
  { id: 'stars', number: 8, title: 'Catch a Little Star', short: 'Catch a Star', icon: '✨' },
  { id: 'garden', number: 9, title: 'A Garden of Good Wishes', short: 'Wish Garden', icon: '🌷' },
  { id: 'jar', number: 10, title: 'A Jar Full of Little Wishes', short: 'Wish Jar', icon: '🫙' },
  { id: 'postcard', number: 11, title: 'A Postcard from Your Future', short: 'Future Postcard', icon: '🇹🇭' },
  { id: 'finale', number: 12, title: 'A Thousand Wishes & The Quiet Ending', short: 'The Quiet Ending', icon: '🌙' },
];

export const pad = (value) => String(value).padStart(2, '0');
