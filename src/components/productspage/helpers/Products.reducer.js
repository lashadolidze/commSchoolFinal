import { SET_LIMIT, SET_FILTER, SET_ORDERING, SET_PAGE, SET_PRODUCTS, SET_SEARCH } from './Product.constants';

export const productReducer = (data, action) => {
  switch (action.type) {
    case SET_PAGE: {
      return {
        ...data,
        page: action.payload,
      };
    }
    case SET_LIMIT: {
      return {
        ...data,
        limit: action.payload,
      };
    }
    case SET_ORDERING:
      return {
        ...data,
        ordering: action.payload,
      };
    case SET_FILTER:
      return {
        ...data,
        maxPrice: action.payload.maxPrice,
        minPrice: action.payload.minPrice,
      };
    case SET_PRODUCTS:
      return {
        ...data,
        products: action.payload,
      };
    case SET_SEARCH:
      return {
        ...data,
        search: action.payload,
    };
    default: {
      return data;
    }
  }
}