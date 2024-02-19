package com.blog.controller;

import com.blog.bean.*;
import com.blog.mapper.RecipeMapper;
import com.blog.service.RecipeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.ArrayList;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)

@RequestMapping("/api/recipe")
public class RecipeController {

    @Resource
    RecipeService recipeService;

    @Resource
    RecipeMapper recipeMapper;

    @ResponseBody
    @GetMapping("/getAllRecipes")
    public Response<ArrayList<RecipeWithLabels>> getAllRecipes(){
        ArrayList<RecipeWithLabels> recipeWithLabelsList = recipeService.getAllRecipesWithLabels();
        if(recipeWithLabelsList!=null) {
            //System.out.println("all:"+recipeWithLabelsList);
            return Response.createSuc(recipeWithLabelsList);
        }
        else{
            return Response.createErr("fail");
        }
    }

    @ResponseBody
    @GetMapping("/getOneRecipeWithLabels/{recipeId}")
    public Response<RecipeWithLabels> getOneRecipeWithLabels(@PathVariable Integer recipeId){
        System.out.println("getOneRecipeWithLabels"+recipeId);
        RecipeWithLabels recipeWithLabels = recipeService.getOneRecipeWithLabels(recipeId);
        if(recipeWithLabels != null) {
            //System.out.println("recipe:"+recipeWithLabels);
            return Response.createSuc(recipeWithLabels);
        }
        else{
            return Response.createErr("fail");
        }
    }

    @ResponseBody
    @GetMapping("/getRecipesWithACertainLabel/{label}")
    public Response<ArrayList<RecipeWithLabels>> getRecipesWithACertainLabel(@PathVariable String label){
        System.out.println("label"+label);
        ArrayList<RecipeWithLabels> recipeWithLabelsList = recipeService.getRecipesWithACertainLabel(label);
        if(recipeWithLabelsList!=null) {
            //System.out.println("all:"+recipeWithLabelsList);
            return Response.createSuc(recipeWithLabelsList);
        }
        else{
            return Response.createErr("fail");
        }
    }

    @ResponseBody
    @PostMapping("/favoriteRecipe")
    public Response<Boolean> favoriteRecipe(@RequestBody Favorite favorite){
        Boolean b = recipeService.favoriteRecipe(favorite);
        if(b != null) {
            return Response.createSuc(b);
        }
        else{
            return Response.createErr("fail");
        }
    }

    @ResponseBody
    @PostMapping("/unfavoriteRecipe")
    public Response<Boolean> unfavoriteRecipe(@RequestBody Favorite favorite){
        System.out.println("fav"+favorite.getRecipeId());
        Boolean b = recipeService.unfavoriteRecipe(favorite);
        if(b != null) {
            return Response.createSuc(b);
        }
        else{
            return Response.createErr("fail");
        }
    }

    @ResponseBody
    @PostMapping("/getFavByUser")
    public Response<ArrayList<RecipeWithLabels>> getFavByUser(@RequestBody User user){
        //System.out.println("getFavByUser:"+user.getUserId());
        ArrayList<RecipeWithLabels> recipeWithLabels = recipeService.getFavByUser(user);
        if(recipeWithLabels != null) return Response.createSuc(recipeWithLabels);
        else return Response.createErr("fail");
    }

    @ResponseBody
    @PostMapping("/getFavOrNot")
    public Response<Boolean> getFavOrNot(@RequestBody Favorite favorite){
        //System.out.println("getFavOrNot:"+favorite.getUserId()+" "+favorite.getRecipeId());
        Boolean b = recipeService.getFavOrNot(favorite);
        //System.out.println("b:"+b);
        if(b != null) {
            return Response.createSuc(b);
        }
        else return Response.createErr("fail");
    }

    @ResponseBody
    @PostMapping("/upload")
    public Response<Boolean> uploadRecipe(
            @RequestParam("recipeName") String recipeName,
            @RequestParam("serves") String serves,
            @RequestParam("cookTime") String cookTime,
            @RequestParam("ingredients") String ingredients,
            @RequestParam("method") String method,
            @RequestParam("recipeAuthor") String recipeAuthor,
            @RequestParam("mealType") String mealType,
            @RequestParam("mainIngredients") String[] mainIngredients,
            @RequestParam("recipePic") MultipartFile file) {
        System.out.println("upload:"+file);
        Recipe recipe = new Recipe();
        recipe.setRecipeName(recipeName);
        recipe.setServes(serves);
        recipe.setCookTime(cookTime);
        recipe.setIngredients(ingredients);
        recipe.setMethod(method);
        recipe.setRecipeAuthor(recipeAuthor);

        System.out.println("mi:"+mainIngredients);

        Boolean b = recipeService.saveRecipe(recipe, file);

        Integer recipeId = recipeMapper.getRecipeId(recipe);
        recipeService.uploadRecipeLabels(recipeId,mealType);
        for(Integer i=0; i<mainIngredients.length; i++){
            String label = mainIngredients[i];
            recipeService.uploadRecipeLabels(recipeId,label);
        }

        if(b!=null) return Response.createSuc(b);
        else return Response.createErr("fail");
    }

    @ResponseBody
    @GetMapping("/search")
    public Response<ArrayList<Recipe>> searchRecipes(@RequestParam String query) {
        System.out.println("keyword:"+query);
        ArrayList<Recipe> recipeArrayList = recipeService.searchRecipes(query);
        return Response.createSuc(recipeArrayList);
    }

}
