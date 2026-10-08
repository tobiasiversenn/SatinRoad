using LinqToDB.Mapping;
using DataType = LinqToDB.DataType;

namespace Infrastructure;

[Table("Users")]

public class User
{
    [PrimaryKey] public string Id { get; set; }
    [Column] public string username { get; set; }
    [Column] public string password { get; set; }
    [Column] public bool isAdmin { get; set; }
     
}