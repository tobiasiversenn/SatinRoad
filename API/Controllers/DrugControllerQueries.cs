using Infrastructure;
using LinqToDB;
namespace Service.Controllers;

using Microsoft.AspNetCore.Mvc;

public class DrugControllerQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllMyDrugs))]
    public List<Drug> GetAllMyDrugs()
    {
        return db.Drugs().Where(d => d.isListed).ToList();
    }

    [HttpPost(nameof(PostDrug))]
    public void PostDrug(Drug drug)
    {
        drug.Id = Guid.NewGuid().ToString();
        db.Insert(drug);
    }

    [HttpDelete(nameof(DeleteDrug))]
    public void DeleteDrug(string drugId)
    {
        var drug = db.Drugs().FirstOrDefault(d => d.Id == drugId);
        db.Delete(drug);
    }
}