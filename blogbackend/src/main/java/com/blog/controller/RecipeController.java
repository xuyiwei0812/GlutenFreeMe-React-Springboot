package com.blog.controller;

import com.blog.bean.Blog;
import com.blog.bean.Favorite;
import com.blog.bean.RecipeWithLabels;
import com.blog.bean.Response;
import com.blog.service.RecipeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;

@Controller
@CrossOrigin(origins = "*", maxAge = 3600)

@RequestMapping("/api/recipe")
public class RecipeController {

    @Resource
    RecipeService recipeService;

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
        return Response.createSuc(b);
    }

    @ResponseBody
    @PostMapping("/unfavoriteRecipe")
    public Response<Boolean> unfavoriteRecipe(@RequestBody Favorite favorite){
        System.out.println("fav"+favorite.getRecipeId());
        Boolean b = recipeService.unfavoriteRecipe(favorite);
        return Response.createSuc(b);
    }
}
