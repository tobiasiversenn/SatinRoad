using Infrastructure;
using LinqToDB;
namespace Service.Controllers;

using Microsoft.AspNetCore.Mvc;

public class WeaponryQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllMyWeaponry))]
    public List<Weaponry> GetAllMyWeaponry()
    {
        return db.Weaponry().Where(w => w.isListed).ToList();
    }

    [HttpPost(nameof(PostWeaponry))]
    public void PostWeaponry(Weaponry weaponry)
    {
        weaponry.Id = Guid.NewGuid().ToString();
        db.Insert(weaponry);
    }

    [HttpDelete(nameof(DeleteWeaponry))]
    public void DeleteWeaponry(string weaponryId)
    {
        var weaponry = db.Weaponry().FirstOrDefault(w => w.Id == weaponryId);
        db.Delete(weaponry);
    }
}