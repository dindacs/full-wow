import book1 from '../components/assets/img/book/book1.png';
import book2 from '../components/assets/img/book/book2.png';
import book3 from '../components/assets/img/book/book3.png';
import book4 from '../components/assets/img/book/book4.png';

const DataBook = [
  {
    id: 1,
    title: "Serangkai",
    author: "Valerie Patkar",
    image: book1,
  },
  {
    id: 2,
    title: "Z1 - Sd/Mi Buku Siswa Tematik T...",
    author: "Afi Yustiyana",
    image: book2,
  },
  {
    id: 3,
    title: "Kabar Rahasia Dari Alam Kubu...",
    author: "DR. Kamil Yusuf Al-Atum",
    image: book3,
  },
  {
    id: 4,
    title: "Tess on the Road",
    author: "Rachel Hartman",
    image: book4,
  },
  //-----------------------
  {
    "ISBN": 9789000307975,
    "title": "Vrienden voor het leven",
    "author": "Maeve Binchy",
    "summary": "Vrienden voor het leven is het verhaal van drie vriendinnen die op weg naar volwassenheid verwikkeld raken in een zonderlinge driehoeksverhouding. Benny en Eve, boezemvriendinnen uit het Ierse dorpje Knockglen, gaan in Dublin studeren en sluiten daar al snel vriendschap met de aantrekkelijke en ambitieuze Nan. Het opwindende studentenleven brengt hun echter niet alleen geluk maar ook verdriet. Met haar grote vermogen om menselijke gevoelens herkenbaar neer te zetten weet Maeve Binchy geluk en verdriet, warmte en humor samen te brengen in deze meeslepende roman. Vrienden voor het leven verscheen voor het eerst in 1991 en is het favoriete boek van vele Maeve Binchy-fans. Het boek is inmiddels toe aan de zeventiende druk. In 1995 werd het zeer succesvol verfilmd onder de titel Circle of Friends met Minnie Driver en Chris O’Donnell in de hoofdrollen.",
    "image": "http://s.s-bol.com/imgbase0/imagebase/large/FC/5/3/6/6/1001004011806635.jpg",
    "price": {
      "currency": "EUR",
      "value": 10,
      "displayValue": "10.00"
    }
  },
  {
    "ISBN": 9780552159722,
    "title": "Deception point",
    "author": "Dan Brown",
    "summary": "When a new NASA satellite detects evidence of an astonishingly rare object buried deep in the Arctic ice, the floundering space agency proclaims a much-needed victory.. a victory that has profound implications for U.S. space policy and the impending presidential election. With the Oval Office in the balance, the President dispatches White House Intelligence analyst Rachel Sexton to the Arctic to verify the authenticity of the find. Accompanied by a team of experts, including the charismatic academic Michael Tolland, Rachel uncovers the unthinkable - evidence of scientific trickery - a bold deception that threatens to plunge the world into controversy..",
    "image": "http://s.s-bol.com/imgbase0/imagebase/large/FC/8/8/9/8/1001004006878988.jpg",
    "price": {
      "currency": "EUR",
      "value": 9.99,
      "displayValue": "9.99"
    }
  },
  {
    "ISBN": 9789022558027,
    "title": "Magic staff",
    "author": "Terry Brooks",
    "summary": "Vijf eeuwen geleden werd de wereld door een noodlottige demonenoorlog in de as gelegd. De overlevenden hebben een toevluchtsoord gevonden in een door magie beschermde vallei, maar nu staat een genadeloos leger op het punt de vallei binnen te vallen. De enige hoop op redding voor de overlevenden was Sider Ament, maar hij leeft niet meer. Sider was de drager van de enig overgebleven zwarte staf, een machtige talisman die eeuwenlang door de Ridders van het Woord is doorgegeven en die van cruciaal belang is bij het in evenwicht houden van de magie op de wereld. Om de wereld van de ondergang te redden, moet de magie van de staf behouden blijven. Panterra Qu, een jonge Spoorzoeker aan wie de staf na Siders dood wordt doorgegeven, heeft grote moeite om de macht ervan naar zijn hand te zetten. Alles moet op alles worden gezet, want eenieder zal een hoge tol betalen als de oorlog tussen het Woord en de Leegte naar de duisternis dreigt af te glijden. ",
    "image": "http://s.s-bol.com/imgbase0/imagebase/large/FC/2/2/5/2/9200000002212522.jpg",
    "price": {
      "currency": "EUR",
      "value": 17.5,
      "displayValue": "17.50"
    }
  },
  {
    "ISBN": 9781841499789,
    "title": "Bloodfire Quest",
    "author": "Terry Brooks",
    "summary": "The adventure that started in Wards of Faerie takes a thrilling new turn, in the second novel of New York Times bestselling author Terry Brooks’s brand-new trilogy—The Dark Legacy of Shannara! The quest for the long-lost Elfstones has drawn the leader of the Druid order and her followers into the hellish dimension known as the Forbidding, where the most dangerous creatures banished from the Four Lands are imprisoned. Now the hunt for the powerful talismans that can save their world has become a series of great challenges: a desperate search for kidnapped comrades, a relentless battle against unspeakable predators, and a grim race to escape the Forbidding alive. But though freedom is closer than they know, it may come at a terrifying price. Back in the village of Arborlon, the mystical, sentient tree that maintains the barrier between the Four Lands and the Forbidding is dying. And with each passing day, as the breach between the two worlds grows larger, the threat of the evil eager to spill forth and wreak havoc grows more dire. The only hope lies with a young Druid, faced with a staggering choice: cling to the life she cherishes or combat an army of darkness by making the ultimate sacrifice.",
    "image": "http://s.s-bol.com/imgbase0/imagebase/large/FC/7/0/0/7/9200000009027007.jpg",
    "price": {
      "currency": "EUR",
      "value": 24.5,
      "displayValue": "24.50"
    }
  },
  // {
  //   "ISBN": 9781409117933,
  //   "title": "A Week in Winter",
  //   "author": "Maeve Binchy",
  //   "summary": "Stoneybridge is full of holiday-makers in summer, its beaches are full of buckets and spades and sandcastles; but in winter it's cold and wild. Few choose to walk along the fine sands, the big round pebbles and the exposed rocky promontories that make up the wind-swept Atlantic coastline. Those who do can't help but see Stone House, the big house on the cliff; once falling into disrepair it is now a beautiful hotel specialising in winter holidays. Its big, warm kitchen, its open log-fires and its elegant bedrooms provide a welcome few can resist, whatever their reasons for coming. Henry and Nicola are burdened with a terrible secret, while cheerful nurse Winnie finds herself on the holiday from hell. John has arrived on an impulse after he missed a flight at Shannon; eccentric Freda claims to be a psychic - and a part-time hairdresser. Then there's Nora, a silent watchful older woman who seems ready to disapprove at any moment.. A Week in Winter is full of Maeve's trademark warmth, humour and characters you want to spend time with.",
  //   "image": "http://s.s-bol.com/imgbase0/imagebase/large/FC/6/2/8/0/9200000008070826.jpg",
  //   "price": {
  //     "currency": "EUR",
  //     "value": 11.99,
  //     "displayValue": "11.99"
  //   }
  // },
  // {
  //   "ISBN": 9789460681387,
  //   "title": "Blue Curacao",
  //   "author": "Linda van Rijn",
  //   "summary": "Als haar kersverse echtgenoot tijdens de huwelijksreis spoorloos verdwijnt, staat Hannah voor een raadsel. Hoe goed kent ze eigenlijk de mensen die ze altijd... De romantische huwelijksreis van Hannah en Koen naar Curaçao wordt ruw verstoord als Koen tijdens het snorkelen spoorloos verdwijnt. Hannah wordt gek van angst. De plaatselijke politie loopt niet zo hard als Hannah zou willen en ten einde raad gaat ze zelf op onderzoek uit. Die zoektocht brengt onaangename waarheden aan het licht. Als Hannah zelfs voor haar eigen leven moet vrezen, wordt ze geconfronteerd met de vraag of ze Koen wel zo goed kent als ze denkt.",
  //   "image": "http://s.s-bol.com/imgbase0/imagebase/large/FC/0/9/4/2/9200000010732490.jpg",
  //   "price": {
  //     "currency": "EUR",
  //     "value": 48.99,
  //     "displayValue": "48.99"
  //   }
  // },
  // {
  //   "ISBN": 9780751548525,
  //   "title": "Safe Haven",
  //   "author": "Nicholas Sparks",
  //   "summary": "Love hurts. There is nothing as painful as heartbreak. But in order to learn to love again you must learn to trust again. When a mysterious young woman named Katie appears in the small town of Southport, her sudden arrival raises questions about her past. Beautiful yet unassuming, Katie is determined to avoid forming personal ties until a series of events draws her into two reluctant relationships. Despite her reservations, Katie slowly begins to let down her guard, putting down roots in the close-knit community. But even as Katie starts to fall in love, she struggles with the dark secret that still haunts her ...",
  //   "image": "http://s.s-bol.com/imgbase0/imagebase/large/FC/0/5/2/3/9200000010683250.jpg",
  //   "price": {
  //     "currency": "EUR",
  //     "value": 33.8,
  //     "displayValue": "33.80"
  //   }
  // },
  // {
  //   "ISBN": 9789023429258,
  //   "title": "De wereld volgens Garp",
  //   "author": "John Irving",
  //   "summary": "De wereld volgens Garp is een zeldzaam komische, originele maar ook schokkende roman die John Irving in één klap beroemd maakte. Sinds de verschijning in 1978 hebben miljoenen lezers genoten van de excentrieke, non-conformistische Jenny, haar zoon T.S. Garp en de fanatici, onschuldige kinderen, transseksuelen, hoeren, worstelaars en de vele andere figuren die de wereld van Garp bevolken. De wereld volgens Garp is een klassieker, een meesterlijke tragikomedie die een diepe indruk op de lezer zal achterlaten.",
  //   "image": "http://s.s-bol.com/imgbase0/imagebase/large/FC/6/3/6/7/1001004005997636.jpg",
  //   "price": {
  //     "currency": "EUR",
  //     "value": 19.9,
  //     "displayValue": "19.90"
  //   }
  // },
];

export default DataBook;