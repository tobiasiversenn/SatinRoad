using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NSwag.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var options = new DataOptions().UseSQLite(Environment.GetEnvironmentVariable("DB") ??"Data Source=dev.db");
builder.Services.AddSingleton(new DataOptions<MyDatabaseConnection>(options));

builder.Services.AddOpenApiDocument();

builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddScoped<MyDatabaseConnection>();


var app =  builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyDatabaseConnection>();
    db.CreateTable<Drug>(tableOptions: TableOptions.CreateIfNotExists);
   db.CreateTable<StolenArtifact>(tableOptions: TableOptions.CreateIfNotExists);
     db.CreateTable<User>(tableOptions: TableOptions.CreateIfNotExists);
    db.CreateTable<Weaponry>(tableOptions: TableOptions.CreateIfNotExists);
    db.CreateTable<Category>(tableOptions:  TableOptions.CreateIfNotExists);
    db.CreateTable<Order>(tableOptions: TableOptions.CreateIfNotExists);

    if (!db.Drugs().Any())
    {
        db.Insert(new Drug()
        {
            Id = Guid.NewGuid().ToString(),
            drugName = "Cocaine",
            price = 50,
            sellerName = "Martin",
            sellerId = "salsdjsl",
            isListed = true
            
        });

        db.Insert(new Drug()
        {
            Id = Guid.NewGuid().ToString(),
            drugName = "Alkohol",
            price = 30,
            sellerName = "Dylan",
            sellerId = "lsfksadfs",
            isListed = true

        });
        db.Insert(new Drug()
        {
            Id = Guid.NewGuid().ToString(),
            drugName = "Paracatemol",
            price = 30,
            sellerName = "Dylan",
            sellerId = "lsfksadfs",
            isListed = true

        });

        db.Insert(new StolenArtifact()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Golden Ring",
            price = 5000,
            sellerId = "lsfksadfs",
            sellerName = "Michael",
            isListed = true

        });
        
        db.Insert(new StolenArtifact()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Ancient statue",
            price = 7000,
            sellerId = "sdkalfs",
            sellerName = "Anders",
            isListed = true

        });
        db.Insert(new StolenArtifact()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Old building",
            price = 4920,
            sellerId = "sdkalfs",
            sellerName = "Anders",
            isListed = true

        });
        db.Insert(new StolenArtifact()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Ancient coin",
            price = 3482,
            sellerId = "sdkalfs",
            sellerName = "Anders",
            isListed = true

        });

        db.Insert(new Weaponry()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Revolver",
            price = 9000,
            sellerId = "lsfksadfs",
            sellerName = "Olivia",
            isListed = true


        });
        
        db.Insert(new Weaponry()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Deagle",
            price = 8000,
            sellerId = "skfkdsfs",
            sellerName = "James",
            isListed = true


        });
        db.Insert(new Weaponry()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Handgun",
            price = 6000,
            sellerId = "skfkdsfs",
            sellerName = "James",
            isListed = true


        });
        db.Insert(new Weaponry()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Shotgun",
            price = 5000,
            sellerId = "skfkdsfs",
            sellerName = "James",
            isListed = true
        });
        db.Insert(new Weaponry()
        {
            Id = Guid.NewGuid().ToString(),
            name = "Bow",
            price = 8000,
            sellerId = "skfkdsfs",
            sellerName = "James",
            isListed = true


        });
        db.Insert(new Category()
        {
            Id = Guid.NewGuid().ToString(),
            categoryName = "Drugs"
        });
        
        db.Insert(new Category()
        {
            Id = Guid.NewGuid().ToString(),
            categoryName = "Stolen Artifacts"
        });
        
        db.Insert(new Category()
        {
            Id = Guid.NewGuid().ToString(),
            categoryName = "Weaponry"
        });

        db.Insert(new User()
        {
            Id = "7f3a9c21-6d84-4b17-a2e9-5c8d1f430b76",
            isAdmin = true,
            password = "",
            username = "James"
        });

    }
    

}



app.UseCors(_ => _.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().SetIsOriginAllowed(_ => true));
app.UseOpenApi();
app.UseSwaggerUi();
app.MapControllers();
app.Run();