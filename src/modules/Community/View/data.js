const images = [
  {
    type: 'image',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWkk_U_qjkhpocszZ3udC6BDRT6MXyJlw1TwycO5FAoc65_6kn71tbq1_7i6dIay-wlXQ&usqp=CAU',
  },
];

const oneMinute = 1000 * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

const posts = [
  // Basic
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: {
      avatar:
        'https://media.licdn.com/dms/image/C4E03AQGF3upDt8Y37A/profile-displayphoto-shrink_800_800/0/1578682863751?e=2147483647&v=beta&t=NGMJrBJcSAgJDLGPhHBbxmOgFH-Rk3wjkoXFO-uRwfo',
      fullName: 'Hal Lawton',
      title: 'President & CEO of TSC',
    },
    post: {
      date: `${new Date(new Date() - oneDay)}`,
      // text: 'Congrats to the Hillsborough, NC Tractor Supply (#302) for having the most sales last month!',
      text: `
        <p style="padding-top: 0; margin: 0;">Congrats to the Hillsborough, NC Tractor Supply (#302) for having the most sales last month!</p>
        <ul>
          <li>Item1</li>
          <li>Item2</li>
          <li>Item3</li>
        </ul>`,
      attachments: null,
      link: null,
    },
  },

  // Single Image
  {
    id: 'ad7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    user: {
      avatar:
        'https://s23.q4cdn.com/539497486/files/images/management/2021/07/John-Ordus.jpg',
      fullName: 'John Ordus',
      title: 'Executive VP & Chief Stores Officer',
    },
    post: {
      date: `${new Date(new Date().getTime() - oneHour)}`,
      text: 'The Tractor Supply Foundation is honored to support the Boys & Girls Club of Middle Tennessee this #GivingTuesday. A $50k grant will go toward new computers, a 3D printer, books, and laptops.',
      attachments: images,
      link: null,
    },
  },

  // Link
  {
    id: '8d7acbda-c1b1-46c2-aed5-3ad53abf28ba',
    user: {
      avatar:
        'https://media.licdn.com/dms/image/C4E03AQGF3upDt8Y37A/profile-displayphoto-shrink_800_800/0/1578682863751?e=2147483647&v=beta&t=NGMJrBJcSAgJDLGPhHBbxmOgFH-Rk3wjkoXFO-uRwfo',
      fullName: 'Hal Lawton',
      title: 'President & CEO of TSC',
    },
    post: {
      date: `${new Date(new Date().getTime() - oneMinute)}`,
      text: 'As 2022 comes to a close, Tractor Supply is gearing up for a special year ahead. 2023 marks 85 years in business for our company. The coming year will be one of celebration but also excitement…',
      attachments: null,
      link: 'https://tractorsupply.com',
    },
  },
];

const data = {
  posts,
  images,
};

export default data;
