import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{
    ingredientchanged=new EventEmitter<Ingredient[]>()
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];
    getIngredient(){
        return this.ingredients.slice()
    }
    addIngredient(ing:Ingredient){
        this.ingredients.push(ing)
        this.ingredientchanged.emit(this.ingredients.slice())

    }
    addIngredients(ingredients:Ingredient[]){
      this.ingredients.push(...ingredients)
      this.ingredientchanged.emit(this.ingredients.slice())
    }
}