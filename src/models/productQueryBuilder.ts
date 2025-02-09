const brandFilterBuilder = (value) => {
  return typeof value === "object"
    ? `brands.id IN (${value})`
    : `brands.id = ${value}`;
};

const sizeFilterBuilder = (value) => {
  return typeof value === "object"
    ? `product_options.size_id IN (${value})`
    : `product_options.size_id = ${value}`;
};

const priceFilterBuilder = (value) => {
  const arr = [];
  if (typeof value === "object") {
    for (let i of value) {
      const priceList = i.split("~");
      const phrase = `price BETWEEN ${priceList[0]} AND ${priceList[1]}`;
      arr.push(phrase);
    }
    return arr.join(" AND ");
  } else {
    const priceList = value.split("~");
    return `price BETWEEN ${priceList[0]} AND ${priceList[1]}`;
  }
};

const subcategoryFilterBuilder = (value: string) => {
  return `sub_category_id = ${value}`;
};

export const makeProductQueryBuilders = (filterOptions: object): string => {
  const builderSet = {
    subCategoryId: subcategoryFilterBuilder,
    brandId: brandFilterBuilder,
    sizeId: sizeFilterBuilder,
    priceId: priceFilterBuilder,
  };

  const wherePhrase = Object.entries(filterOptions).map(([key, value]) => {
    return builderSet[key](value);
  });

  if (wherePhrase.length !== 0) {
    return `WHERE ${wherePhrase.join(" AND ")}`;
  } else {
    return " ";
  }
};

export const orderSet = {
  price_DESC: "price DESC",
  price_ASC: "price ASC",
  created_at: "created_at DESC",
};
