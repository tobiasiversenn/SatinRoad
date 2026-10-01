using System.Runtime.InteropServices.JavaScript;
using System.Security.Cryptography;
using Infrastructure;
using LinqToDB;
using SatinRoad;

namespace Service.Controllers;


using Microsoft.AspNetCore.Mvc;

public class InventoryQueries (MyDatabaseConnection db) : ControllerBase
{
    private readonly RandomNumber randomNumber = new();
    
    [HttpGet(nameof(getDrugsInInventory))]
    public List<Drug> getDrugsInInventory()
    {
        return db.Drugs().Where(d => d.isListed == false).ToList();
        //Senere kan logik tilføjes med at det skal hentes for en bestemt bruger, men lige nu er der kun 1 bruger i systemet
    }
    
    [HttpPost(nameof(addDrugToInventory))]
    public ActionResult<string> addDrugToInventory(string drugId)
    {
        if (randomNumber.isRandomNumber())
        {
            Console.WriteLine("The buyer is the FBI");
            return new JsonResult("FBI");
        }
        var drug = db.Drugs().FirstOrDefault(d => d.Id == drugId);
        drug.isListed = false;
        db.Update(drug);
        return new JsonResult("Success");
    }

    [HttpGet(nameof(getWeaponryInInventory))]
    public List<Weaponry> getWeaponryInInventory()
    {
        return db.Weaponry().Where(w => w.isListed == false).ToList();
    }

    [HttpPost(nameof(addWeaponryToInventory))]
    public ActionResult<string> addWeaponryToInventory(string weaponryId)
    {
        if (randomNumber.isRandomNumber())
        {
            Console.WriteLine("The buyer is the FBI");
            return new JsonResult("FBI");
        }
        var weaponry = db.Weaponry().FirstOrDefault(w => w.Id == weaponryId);
        weaponry.isListed = false;
        db.Update(weaponry);
        return new JsonResult("Success");

    }

    [HttpGet(nameof(getStolenArtifactsInInventory))]
    public List<StolenArtifact> getStolenArtifactsInInventory()
    {
        return db.StolenArtifacts().Where(sa => sa.isListed == false).ToList();
    }

    [HttpPost(nameof(addStolenArtifactToInventory))]
    public ActionResult<string> addStolenArtifactToInventory(string stolenArtifactId)
    {
        if (randomNumber.isRandomNumber())
        {
            Console.WriteLine("The buyer is the FBI");
            return new JsonResult("FBI");
        }
        var stolenArtifact = db.StolenArtifacts().FirstOrDefault(sa => sa.Id == stolenArtifactId);
        stolenArtifact.isListed = false;
        db.Update(stolenArtifact);
        return new JsonResult("Success");

    }
}