import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping-list.services";
import { Recipe } from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core"
@Injectable()
export class RecipeService{
    selectRecipe=new EventEmitter<Recipe>()
    private recipes: Recipe[] = [
        new Recipe(
          'A Test Recipe',
          'This is simply a test', 
          'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
           [
            new Ingredient('Meat',1),
            new Ingredient('French Fries',23)


           ]),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
          new Ingredient('Buns',10),
            new Ingredient('Meat',13)
        ])
      ];
constructor(private shoppingService:ShoppingService){}
      getRecipes(){
        return this.recipes.slice()
      }
      addIngredientToShoopingList(ingredients:Ingredient[]){
        this.shoppingService.addIngredients(ingredients)
      }
}