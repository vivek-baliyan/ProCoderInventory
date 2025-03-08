using Microsoft.EntityFrameworkCore;
using PCI.Application.Services.Interfaces;

namespace PCI.Persistence.Context;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IUserAccessorService userAccessor) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply filter based on IUserAccessor
        //var userId = userAccessor.GetCurrentUserId();
        //modelBuilder.Entity<YourEntity>().HasQueryFilter(e => e.UserId == _userAccessor.GetCurrentUserId());
    }
}