using Infrastructure;
using LinqToDB;
using Service.Controllers;

namespace UnitTest;
using Xunit;

public class UnitTest1
{
    
    private readonly CategoryQueries _categoryQueries;
    private readonly OrderQueries _orderQueries;
    private readonly MyDatabaseConnection _db;
    
    public UnitTest1()
    {
        var options = new DataOptions()
            .UseSQLite("Data Source=test.db");
 
        _db = new MyDatabaseConnection(
            new DataOptions<MyDatabaseConnection>(options));
        
        _db.CreateTable<Category>(
            tableOptions: TableOptions.CreateIfNotExists);
        _db.CreateTable<User>(
            tableOptions: TableOptions.CreateIfNotExists);
        _db.CreateTable<Order>(
            tableOptions: TableOptions.CreateIfNotExists);
        
 
        _categoryQueries = new CategoryQueries(_db);
        _orderQueries = new OrderQueries(_db);
    }
    
    
    [Fact]
    public void TestCreateCategory()
    {
        //Arrange 
        Category category = new Category
        {
            categoryName = "myCategory"
        };

        //Act 
        _categoryQueries.PostCategory(category);

        //Assert 
        string categoryName = _categoryQueries.GetCategoryName(category.Id);
        Assert.Equal("myCategory", categoryName);
    }

    [Fact]
    public void TestDeleteCategory()
    {
        //Arrange
        Category category = new Category
        {
            categoryName = "Category"
        };
        
        
        //Act
        _categoryQueries.PostCategory(category);
        _categoryQueries.DeleteCategory(category.Id);
        
        //Assert
        Boolean doesCategoryExist =  _categoryQueries.DoesCategoryExist(category.Id);
        
        Assert.Equal(false, doesCategoryExist);
    }

    [Fact]
    public void GetUsersWithMoreThan100Orders()
    {
        //Arrange 
        var user = new User()
        {
            Id = Guid.NewGuid().ToString(),
            isAdmin = true,
            password = "",
            username = "TestUser"
        };
        
        //Act
        _db.Insert(user);

        int count = 0;
        while (count < 120)
        {
            _db.Insert(new Order()
            {
                Id = Guid.NewGuid().ToString(),
                buyerId = Guid.NewGuid().ToString(),
                vendorId = user.Id
            });
            count++;
        } 
        
        //Assert
        var users = _orderQueries.GetUsersWithMoreThan100Orders();
        Boolean doesUserHaveMoreThan100Orders = users.Any(u => u.Id ==  user.Id);
        Assert.Equal(true, doesUserHaveMoreThan100Orders);
        
    }


    [Fact]
    public void ShouldThereBe20PercentDiscount()
    {
        //Arrange
        var user1 = new User()
        {
            Id = Guid.NewGuid().ToString(),
            isAdmin = true,
            password = "",
            username = "TestUser1"
        };

        var user2 = new User()
        {
            Id = Guid.NewGuid().ToString(),
            isAdmin = true,
            password = "",
            username = "TestUser2"
        };
        


        //Act
        _db.Insert(user1);
        _db.Insert(user2);
        
        int count = 0;
        while (count < 10)
        {
            _db.Insert(new Order()
            {
                Id = Guid.NewGuid().ToString(),
                buyerId = user1.Id,
                vendorId = user2.Id
            });
            count++;
        } 
        
       Boolean shouldThereBe20PercentDiscount= _orderQueries.ShouldThereBe20PercentDiscount(user1.Id, user2.Id);
       
        //Assert
        Assert.Equal(true, shouldThereBe20PercentDiscount);
    }
}