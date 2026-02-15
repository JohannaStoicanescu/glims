export type SortOption =
  | 'recent'
  | 'most-viewed'
  | 'most-popular'
  | 'favorites'
  | 'oldest';

export type FileType = 'all' | 'photos' | 'videos';

export interface Person {
  id: string;
  name: string;
  avatar: string;
}

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Dernière publications' },
  { value: 'most-viewed', label: 'Les plus vues' },
  { value: 'most-popular', label: 'Les plus populaires' },
  { value: 'favorites', label: 'Mes favoris' },
];

export const sortOptionsMobile: { value: SortOption; label: string }[] = [
  ...sortOptions,
  { value: 'oldest', label: 'Les plus anciens' },
];

export const fileTypeOptions: { value: FileType; label: string }[] = [
  { value: 'photos', label: 'Photos' },
  { value: 'videos', label: 'Vidéos' },
  { value: 'all', label: 'Voir tout' },
];

export const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Marie',
    avatar: 'https://picsum.photos/seed/person1/100/100',
  },
  {
    id: '2',
    name: 'Jean',
    avatar: 'https://picsum.photos/seed/person2/100/100',
  },
  {
    id: '3',
    name: 'Sophie',
    avatar: 'https://picsum.photos/seed/person3/100/100',
  },
  {
    id: '4',
    name: 'Pierre',
    avatar: 'https://picsum.photos/seed/person4/100/100',
  },
  {
    id: '5',
    name: 'Claire',
    avatar: 'https://picsum.photos/seed/person5/100/100',
  },
  {
    id: '6',
    name: 'Lucas',
    avatar: 'https://picsum.photos/seed/person6/100/100',
  },
  {
    id: '7',
    name: 'Emma',
    avatar: 'https://picsum.photos/seed/person7/100/100',
  },
  {
    id: '8',
    name: 'Hugo',
    avatar: 'https://picsum.photos/seed/person8/100/100',
  },
  {
    id: '9',
    name: 'Léa',
    avatar: 'https://picsum.photos/seed/person9/100/100',
  },
  {
    id: '10',
    name: 'Thomas',
    avatar: 'https://picsum.photos/seed/person10/100/100',
  },
  {
    id: '11',
    name: 'Julie',
    avatar: 'https://picsum.photos/seed/person11/100/100',
  },
  {
    id: '12',
    name: 'Antoine',
    avatar: 'https://picsum.photos/seed/person12/100/100',
  },
  {
    id: '13',
    name: 'Camille',
    avatar: 'https://picsum.photos/seed/person13/100/100',
  },
  {
    id: '14',
    name: 'Nicolas',
    avatar: 'https://picsum.photos/seed/person14/100/100',
  },
  {
    id: '15',
    name: 'Sarah',
    avatar: 'https://picsum.photos/seed/person15/100/100',
  },
  {
    id: '16',
    name: 'Maxime',
    avatar: 'https://picsum.photos/seed/person16/100/100',
  },
  {
    id: '17',
    name: 'Laura',
    avatar: 'https://picsum.photos/seed/person17/100/100',
  },
];
