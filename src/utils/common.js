import dayjs from 'dayjs';
import { wayPointTypes } from './informations';
import { FilterType } from '../const';

export const typesList = wayPointTypes();

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateListLinkImages = () => {
  const arrayOfImages = [];
  const length = getRandomInteger(1, 5);
  for (let i = 0; i < length; i++) {
    arrayOfImages[i] = `http://picsum.photos/248/152?${ getRandomInteger(0, 99).toString() }`;
  }
  return arrayOfImages;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const isPointRepeating = (repeating) => Object.values(repeating).some(Boolean);

export const createEventTypesMarkup = (types, chosenEventType) => {
  const createTypeMarkup = (type) => {
    const isChecked = type === chosenEventType ? 'checked=""' : '';
    const label = type.charAt(0).toUpperCase() + type.slice(1);

    return `<div class="event__type-item">
                          <input id="event-type-${ type }-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${ type }" for="event-type-${ type }-1">${ label }</label>
                        </div>`;
  };

  return types.map(createTypeMarkup).join('');
};

export const createOffer = (offer) => {
  const { title, type, price } = offer;
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" value="${type}">
  <label class="event__offer-label" for="event-offer-${type}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`;
};

export const sortStatistics = (a, b) => b[1] - a[1];

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs().isBefore(dayjs(event.date.dataBeginEvent))),
  [FilterType.PAST]: (events) => events.filter((event) => dayjs().isAfter(dayjs(event.date.dataBeginEvent))),
};

export const sorttDate = (taskA, taskB) => dayjs(taskA.date.start).diff(dayjs(taskB.date.start));

export const createOffers = (offer) => {
  const { title, price } = offer;
  return `<li class="event__offer">
    <span class="event__offer-title">${ title }</span>
      &plus;&euro;&nbsp;
    <span class="event__offer-price">${ price }</span>
  </li>`;
};
