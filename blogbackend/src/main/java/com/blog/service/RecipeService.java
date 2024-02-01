package com.blog.service;

import com.blog.bean.Recipe;
import com.blog.bean.RecipeLabels;
import com.blog.bean.RecipeWithLabels;
import com.blog.mapper.RecipeMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;

@Service
public class RecipeService {

    @Resource
    RecipeMapper recipeMapper;

    //Get All Recipes
    public ArrayList<RecipeWithLabels> getAllRecipesWithLabels(){
        ArrayList<Recipe> recipesWithoutLabels = recipeMapper.getAllRecipes();
        ArrayList<RecipeWithLabels> recipesWithLabels = new ArrayList<>();

        for(Integer i=0;i<recipesWithoutLabels.size();i++){
            Recipe recipe = recipesWithoutLabels.get(i);
            Integer recipeId = recipe.getRecipeId();
            ArrayList<RecipeLabels> recipeLabels = recipeMapper.getLabelsOfARecipe(recipeId);

            ArrayList<String> labelsString = new ArrayList<>();
            for(Integer j=0;j<recipeLabels.size();j++){
                String label = recipeLabels.get(j).getLabel();
                labelsString.add(label);
            }

            RecipeWithLabels recipeWithLabels = new RecipeWithLabels(recipeId,recipe.getRecipeName(),recipe.getServes(),recipe.getCookTime(),recipe.getIngredients(),recipe.getMethod(),recipe.getRecipeAuthor(),recipe.getRecipePic(),labelsString);
            recipesWithLabels.add(recipeWithLabels);
        }
        return recipesWithLabels;
    }

    //Get One Recipe With Labels
    public RecipeWithLabels getOneRecipeWithLabels(Integer recipeId){
        Recipe recipe = recipeMapper.getOneRecipe(recipeId);
        ArrayList<RecipeLabels> recipeLabels = recipeMapper.getLabelsOfARecipe(recipeId);
        ArrayList<String> labelsString = new ArrayList<>();
        for(Integer j=0;j<recipeLabels.size();j++){
            String label = recipeLabels.get(j).getLabel();
            labelsString.add(label);
        }

        RecipeWithLabels recipeWithLabels = new RecipeWithLabels(recipeId,recipe.getRecipeName(),recipe.getServes(),recipe.getCookTime(),recipe.getIngredients(),recipe.getMethod(),recipe.getRecipeAuthor(),recipe.getRecipePic(),labelsString);
        return recipeWithLabels;
    }


    //Get Recipes With A Certain Label
    public ArrayList<RecipeWithLabels> getRecipesWithACertainLabel(String label){
        ArrayList<RecipeWithLabels> recipeWithLabelsList = new ArrayList<>();

        ArrayList<Integer> recipeIdList = recipeMapper.getRecipeIdsOfACertainLabel(label);
        for(Integer i=0;i<recipeIdList.size();i++){
            Integer recipeId = recipeIdList.get(i);
            RecipeWithLabels recipeWithLabels = getOneRecipeWithLabels(recipeId);
            recipeWithLabelsList.add(recipeWithLabels);
        }
        return recipeWithLabelsList;
    }

}


