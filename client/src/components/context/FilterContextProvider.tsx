import React, { createContext, SetStateAction, useState } from "react";

interface IContext {
  categories: string[];
  brands: string[];
  currPage: number;
  setCurrPage: React.Dispatch<SetStateAction<number>>;
  setBrands: React.Dispatch<SetStateAction<string[]>>;
  setCategories: React.Dispatch<SetStateAction<string[]>>;
}

export const filterContext = createContext<IContext>({} as IContext);

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeCategory, setActiveCategory] = useState<string[]>([]);
  const [activeBrand, setActiveBrand] = useState<string[]>([]);
  const [currPage, setCurrPage] = useState(1);

  return (
    <filterContext.Provider
      value={{
        currPage: currPage,
        setCurrPage: setCurrPage,
        categories: activeCategory,
        brands: activeBrand,
        setBrands: setActiveBrand,
        setCategories: setActiveCategory,
      }}
    >
      {children}
    </filterContext.Provider>
  );
};

export default FilterContextProvider;
