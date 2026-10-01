using LinqToDB;
using LinqToDB.Data;
using LinqToDB.Mapping;

namespace Infrastructure;

public class MyDatabaseConnection(DataOptions<MyDatabaseConnection> dataopts) : DataConnection(dataopts.Options)
{
    public ITable<Drug> Drugs() => this.GetTable<Drug>();
    public ITable<StolenArtifact> StolenArtifacts() => this.GetTable<StolenArtifact>();
    public ITable<User> Users() => this.GetTable<User>();
    public ITable<Weaponry> Weaponry() => this.GetTable<Weaponry>();

}