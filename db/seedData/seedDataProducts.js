const { Category, Genre, Product } = require("../");
const { CATEGORIES } = require("./seedDataCategories");
const { GENRES } = require("./seedDataGenres");
const csv = require("csvtojson");

const seedDataProducts = async () => {
  try {
    const products = await csv().fromFile("product_data.csv");
    //console.log(products)

    const categories = (
      await Promise.all(
        CATEGORIES.map((category) => Category.create({ name: category }))
      )
    ).map((category) => {
      return { name: category.dataValues.name, id: category.dataValues.id };
    });

    const genres = (
      await Promise.all(GENRES.map((genre) => Genre.create({ name: genre })))
    ).map((genre) => {
      return { name: genre.dataValues.name, id: genre.dataValues.id };
    });

    await Promise.all(
      products.map((product) => {
        return Product.create({
          name: product.Name,
          cost: product.Cost,
          image: product.Img,
          categoryId: categories.find(
            (category) => product.Category === category.name
          ).id,
          genreId: genres.find((genre) => product.Genre === genre.name).id,
          inventory: Math.floor(Math.random() * (20 - 0 + 1)),
        });
      })
    );
  } catch (ex) {
    console.log(ex);
  }
};

// seedProductData()

module.exports = { seedDataProducts };
