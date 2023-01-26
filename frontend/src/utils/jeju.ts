export const REGION_LIST = [
  { id: 0, data: '한경면' },
  { id: 1, data: '한림읍' },
  { id: 2, data: '애월읍' },
  { id: 3, data: '제주시' },
  { id: 4, data: '조천읍' },
  { id: 5, data: '구좌읍' },
  { id: 6, data: '성산읍' },
  { id: 7, data: '표선면' },
  { id: 8, data: '남원읍' },
  { id: 9, data: '서귀포' },
  { id: 10, data: '중문' },
  { id: 11, data: '안덕면' },
  { id: 12, data: '대정면' },
  { id: 13, data: '우도면' },
];

export const TAG_LIST = [
  { id: 0, name: 'who', data: '싱글' },
  { id: 1, name: 'who', data: '커플' },
  { id: 2, name: 'who', data: '가족' },
  { id: 3, name: 'who', data: '친구' },
  { id: 4, name: 'place', data: '카페' },
  { id: 5, name: 'place', data: '맛집' },
  { id: 6, name: 'place', data: '술집' },
  { id: 7, name: 'place', data: '관광지' },
  { id: 8, name: 'type', data: '자연' },
  { id: 9, name: 'type', data: '역사' },
  { id: 10, name: 'type', data: '어드벤처' },
  { id: 11, name: 'type', data: '이색체험' },
  { id: 12, name: 'season', data: '봄' },
  { id: 13, name: 'season', data: '여름' },
  { id: 14, name: 'season', data: '가을' },
  { id: 15, name: 'season', data: '겨울' },
];

export const WHO_TAG_LIST = TAG_LIST.slice(0, 4);
export const PLACE_TAG_LIST = TAG_LIST.slice(4, 8);
export const TYPE_TAG_LIST = TAG_LIST.slice(8, 12);
export const SEASON_TAG_LIST = TAG_LIST.slice(12, 16);

export const FILE_MAX_SIZE = 3 * 1024 * 1024; /* 3MB */
