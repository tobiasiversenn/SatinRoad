using LinqToDB.Mapping;
namespace Infrastructure;

[Table("Orders")]
public class Order
{
    [PrimaryKey] public string Id { get; set; }
    
    [Column] public string vendorId { get; set; }
    
    [Column] public string buyerId { get; set; }
    
    
    
}