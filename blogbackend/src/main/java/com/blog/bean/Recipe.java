package com.blog.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
    Integer recipeId;
    String recipeName;
    String serves;
    String cookTime;
    String ingredients;
    String method;
    String recipeAuthor;
    String recipePic;
}
