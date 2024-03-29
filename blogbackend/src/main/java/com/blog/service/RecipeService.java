package com.blog.service;

import com.blog.bean.*;
import com.blog.mapper.RecipeMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

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

    //Favorite
    public Boolean favoriteRecipe(Favorite favorite){
        return recipeMapper.favoriteRecipe(favorite);
    }

    public Boolean unfavoriteRecipe(Favorite favorite){
        return recipeMapper.unfavoriteRecipe(favorite);
    }

    //Get Fav By User
    public ArrayList<RecipeWithLabels> getFavByUser(User user){
        ArrayList<Integer> recipeIdList = recipeMapper.getFavByUser(user);
        System.out.println("recipeIdList:"+recipeIdList);
        ArrayList<RecipeWithLabels> recipeWithLabelsList = new ArrayList<>();

        for(Integer i=0;i<recipeIdList.size();i++){
            RecipeWithLabels recipe = getOneRecipeWithLabels(recipeIdList.get(i));
            System.out.println("r"+recipe.getRecipeName());
            recipeWithLabelsList.add(recipe);
        }
        return recipeWithLabelsList;
    }

    //Get fav or not
    public Boolean getFavOrNot(Favorite favorite){
        Integer userId = favorite.getUserId();
        Integer recipeId = favorite.getRecipeId();
        Favorite favorite1 = recipeMapper.GetFavOrNot(recipeId,userId);
        //System.out.println("fav1:"+favorite1);
        if(favorite1!=null) return true;
        else return false;
    }

    //save recipe
    public Boolean saveRecipe(Recipe recipe, MultipartFile file) {
        try {
            // This part is not standard way to do it, you shouldn't make backend directly store something into frontend.
            // I'm just trying to make it easier because this project's mainly about learning how to use React.js.
            String frontendStaticDir = "/Users/lunaxu/IdeaProjects/ReactBlog/blogfrontend/public/img/";

            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            Path filePath = Paths.get(frontendStaticDir, filename);

            Files.createDirectories(filePath.getParent());

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            recipe.setRecipePic("img/"+filename);

            return recipeMapper.uploadRecipe(recipe);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

    //upload recipe labels
    public Boolean uploadRecipeLabels(Integer recipeId, String label){
        return recipeMapper.uploadRecipeLabels(recipeId,label);
    }

    //search
    public ArrayList<Recipe> searchRecipes(String keyword){
        return recipeMapper.searchRecipes(keyword);
    }

}


