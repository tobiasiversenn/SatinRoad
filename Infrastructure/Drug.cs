using LinqToDB.Mapping;

namespace Infrastructure;

[Table("Drugs")]
public class Drug
{
    [PrimaryKey] public string Id { get; set; }
    [Column] public string drugName { get; set; }
    [Column] public int price { get; set; }
    [Column] public string sellerId { get; set; }
    [Column] public string sellerName { get; set; }
    
    [Column] public bool isListed { get; set; }
    
}