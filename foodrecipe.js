unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/guessNutrition?title=Spaghetti+Aglio+et+Olio")
.header("X-Mashape-Key", "wV1j1qbVSPmshY5JE6GuTbGoS3fRp1M24idjsnWKu24B4FwzDv")
.header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
