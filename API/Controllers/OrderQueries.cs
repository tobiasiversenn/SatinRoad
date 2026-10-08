using System;
using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace Service.Controllers;

public class OrderQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpPost(nameof(CreateNewOrder))]

    public void CreateNewOrder(Order order)
    {
        order.Id = Guid.NewGuid().ToString();
        db.Insert(order);
    }

    [HttpGet(nameof(GetUsersWithMoreThan100Orders))]
    public List<User> GetUsersWithMoreThan100Orders()
    {
        return db.Users()
            .Where(u => db.Orders()
                .Count(o => o.vendorId == u.Id) > 100)
            .ToList();
    }

    [HttpGet(nameof(ShouldThereBe20PercentDiscount))]
    public Boolean ShouldThereBe20PercentDiscount(string buyerId, string vendorId)
    {
        var numberOfOrders = db.Orders().Count((o => o.buyerId == buyerId && o.vendorId == vendorId));
        if (numberOfOrders == 10)
        {
            return true;
        }

        return false;
    }
    
}