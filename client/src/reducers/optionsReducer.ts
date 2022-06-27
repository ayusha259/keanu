export interface IOptionsState {
  categoryFilter: string[];
  brandFilter: string[];
  sortBy: string;
  currPage: number;
}

const initialState: IOptionsState = {
  brandFilter: [],
  categoryFilter: [],
  currPage: 1,
  sortBy: "-avg_rating",
};

const optionsReducer = (
  state = initialState,
  action: { type: string; payload: any }
): IOptionsState => {
  switch (action.type) {
    case "UPDATE_CATEGORIES": {
      let category = action.payload;
      if (category === "") {
        return { ...state, categoryFilter: [], currPage: 1 };
      }
      if (!state.categoryFilter.includes(category)) {
        return {
          ...state,
          currPage: 1,
          categoryFilter: [...state.categoryFilter, category],
        };
      } else {
        return {
          ...state,
          categoryFilter: [
            ...state.categoryFilter.filter((c) => c !== category),
          ],
          currPage: 1,
        };
      }
    }
    case "UPDATE_BRANDS": {
      let brand = action.payload;
      if (brand === "") {
        return { ...state, brandFilter: [], currPage: 1 };
      }
      if (!state.brandFilter.includes(brand)) {
        return {
          ...state,
          brandFilter: [...state.brandFilter, brand],
          currPage: 1,
        };
      } else {
        return {
          ...state,
          brandFilter: [...state.brandFilter.filter((b) => b !== brand)],
          currPage: 1,
        };
      }
    }

    case "UPDATE_SORT": {
      return {
        ...state,
        sortBy: action.payload,
        currPage: 1,
      };
    }

    case "RESET_OPTIONS": {
      return {
        ...state,
        brandFilter: [],
        categoryFilter: [],
        currPage: 1,
      };
    }
    case "CHANGE_PAGE": {
      return { ...state, currPage: action.payload };
    }
    default:
      return state;
  }
};

export default optionsReducer;
