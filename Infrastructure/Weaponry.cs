using LinqToDB.Mapping;
using DataType = LinqToDB.DataType;

namespace Infrastructure;

[Table("Weaponry")]

public class Weaponry
{
    [PrimaryKey] public string Id { get; set; }
    [Column] public string name { get; set; }
    [Column] public int price { get; set; }
    [Column] public string sellerId { get; set; }
    [Column] public string sellerName { get; set; }
    
    [Column] public bool isListed { get; set; }

}