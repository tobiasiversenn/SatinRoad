using LinqToDB.Mapping;

namespace Infrastructure;

[Table("Categories")]
public class Category
{
    [PrimaryKey] public string Id { get; set; }
    
    [Column] public string categoryName { get; set; }
}