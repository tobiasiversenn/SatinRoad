using Infrastructure;

namespace Service.Controllers;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

public class CategoryQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllCategories))]
    public List<Category> GetAllCategories()
    {
        return db.Categories().ToList();
    }

    [HttpPost(nameof(PostCategory))]
    public void PostCategory(Category category)
    {
        category.Id = Guid.NewGuid().ToString(); 
        db.Insert(category);
    }

    [HttpDelete(nameof(DeleteCategory))]
    public void DeleteCategory(string categoryId)
    {
        var category = db.Categories().FirstOrDefault(c => c.Id == categoryId);
        db.Delete(category);
    }

    [HttpGet(nameof(GetCategoryName))]
    public string GetCategoryName(string categoryId)
    {
        var category = db.Categories().FirstOrDefault(c => c.Id == categoryId);
        return category.categoryName;
    }

    [HttpGet(nameof(DoesCategoryExist))]
    public Boolean DoesCategoryExist(string categoryId)
    {
        var category = db.Categories().FirstOrDefault(c => c.Id == categoryId);
        if (category != null)
        {
            return true;
        }

        return false;
    }
}