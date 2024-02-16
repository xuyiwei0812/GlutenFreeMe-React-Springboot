package com.blog.mapper;

import com.blog.bean.*;
import org.apache.ibatis.annotations.*;

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

    //FavoriteRecipe
    @Options(useGeneratedKeys = true, keyProperty = "favorite.favId", keyColumn = "favId")
    @Insert("insert into favorite (userId, recipeId) values(#{favorite.userId}, #{favorite.recipeId})")
    Boolean favoriteRecipe(@Param("favorite")Favorite favorite);

    //Unfavorite
    @Delete("delete from favorite where userId=#{favorite.userId} and recipeId=#{favorite.recipeId}")
    Boolean unfavoriteRecipe(@Param("favorite")Favorite favorite);

    //Get fav by user
    @Select("select recipeId from favorite where userId=#{user.userId}")
    ArrayList<Integer> getFavByUser(@Param("user") User user);

    //Get fav or not
    @Select("select * from favorite where userId=#{userId} and recipeId=#{recipeId}")
    Favorite GetFavOrNot(@Param("recipeId") Integer recipeId, @Param("userId") Integer userId);

}
