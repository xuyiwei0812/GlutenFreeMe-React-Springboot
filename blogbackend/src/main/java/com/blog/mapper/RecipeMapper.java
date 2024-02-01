package com.blog.mapper;

import com.blog.bean.Blog;
import com.blog.bean.Recipe;
import com.blog.bean.RecipeLabels;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

@Mapper
public interface RecipeMapper {
    //get All Recipes
    @Select("select * from recipe")
    ArrayList<Recipe> getAllRecipes();

    //get One Recipe
    @Select("select * from recipe where recipeId=#{recipeId}")
    Recipe getOneRecipe(@Param("recipeId") Integer recipeId);

    //get Labels Of A Recipe
    @Select("select * from recipeLabels where recipeId=#{recipeId}")
    ArrayList<RecipeLabels> getLabelsOfARecipe(@Param("recipeId") Integer recipeId);

    //Get RecipeIds With Certain Label
    @Select("select recipeId from recipeLabels where label=#{label}")
    ArrayList<Integer> getRecipeIdsOfACertainLabel(@Param("label") String label);
}
