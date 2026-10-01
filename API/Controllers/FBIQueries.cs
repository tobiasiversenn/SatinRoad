using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;
namespace Service.Controllers;

public class FBIQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpDelete(nameof(DeleteVendorAndVendorProducts))]
    public void DeleteVendorAndVendorProducts(string sellerId)
    {
        using var transaction = db.BeginTransaction();
        try
        {
            var vendor = db.Users().FirstOrDefault(u => u.Id == sellerId);
            var InventoryProducts = db.Drugs().Where(d => d.sellerId == sellerId).ToList();
            db.Delete(InventoryProducts);

            var StolenArtifactProducts = db.StolenArtifacts().Where(sa => sa.sellerId == sellerId).ToList();
            db.Delete(StolenArtifactProducts);

            var WeaponryProducts = db.Weaponry().Where(w => w.sellerId == sellerId).ToList();
            db.Delete(WeaponryProducts);

            db.Delete(vendor);

            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
}