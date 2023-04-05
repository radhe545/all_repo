import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping-list.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] 

  constructor(private slService:ShoppingService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredient()
    this.slService.ingredientchanged.subscribe((newIngredient:Ingredient[])=>{
      this.ingredients=newIngredient
    })
  }
}
