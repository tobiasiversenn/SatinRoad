using Infrastructure;
using LinqToDB;
namespace Service.Controllers;

using Microsoft.AspNetCore.Mvc;

public class StolenArtifactQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllMyStolenArtifacts))]
    public List<StolenArtifact> GetAllMyStolenArtifacts()
    {
        return db.StolenArtifacts().Where(sa => sa.isListed).ToList();
    }

    [HttpPost(nameof(PostStolenArtifact))]
    public void PostStolenArtifact(StolenArtifact stolenArtifact)
    {
        stolenArtifact.Id = Guid.NewGuid().ToString();
        db.Insert(stolenArtifact);
    }

    [HttpDelete(nameof(DeleteStolenArtifact))]
    public void DeleteStolenArtifact(string stolenArtifactId)
    {
        var stolenArtifact = db.StolenArtifacts().FirstOrDefault(sa => sa.Id == stolenArtifactId);
        db.Delete(stolenArtifact);
    }
}