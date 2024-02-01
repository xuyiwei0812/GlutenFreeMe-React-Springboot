package com.blog.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeWithLabels {
    Integer recipeId;
    String recipeName;
    String serves;
    String cookTime;
    String ingredients;
    String method;
    String recipeAuthor;
    String recipePic;
    ArrayList<String> labels;
}
