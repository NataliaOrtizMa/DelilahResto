const dishes = (dishName, unitPrice, urlImage, dishId) => ({
  deleteTable: 
    `DROP TABLE IF EXISTS dishes;`,
  createTable: 
    `CREATE TABLE IF NOT EXISTS dishes (
      id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      dishName VARCHAR(255) NOT NULL UNIQUE,
      unitPrice INT(10) UNSIGNED NOT NULL,
      urlImage VARCHAR(255) DEFAULT ''
    )`,
  setDish: 
    `INSERT INTO dishes (
        dishName, 
        unitPrice, 
        urlImage) 
    VALUES (
      '${dishName}',
      '${unitPrice}',
      '${urlImage}'
    )`,
  getOne: 
    `SELECT * FROM dishes 
    WHERE id = '${dishId}'`,
  getAll: "SELECT * FROM dishes",
  updateDish:
    `UPDATE dishes
    SET dishName = '${dishName}', 
      unitPrice = '${unitPrice}', 
      urlImage = '${urlImage}' 
    WHERE id = ${dishId}`,
  deleteDish: 
    `DELETE FROM dishes
    WHERE id = '${dishId}'`,
});

module.exports = { dishes };
