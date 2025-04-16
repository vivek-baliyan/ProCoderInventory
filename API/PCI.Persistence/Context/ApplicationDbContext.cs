using Microsoft.EntityFrameworkCore;
using PCI.Application.Services.Interfaces;
using PCI.Domain.Models;

namespace PCI.Persistence.Context;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IUserAccessorService userAccessor) : DbContext(options)
{

    public DbSet<UserProfile> UserProfiles { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Set schema for all tables
        modelBuilder.HasDefaultSchema("APP");

        // Configure UserProfile entity
        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.Property(e => e.UserId).HasMaxLength(36);
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.ProfileImageUrl).HasMaxLength(255);
            entity.Property(e => e.Country).HasMaxLength(100);
            entity.Property(e => e.StreetAddress).HasMaxLength(200);
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.PostalCode).HasMaxLength(20);
            entity.Property(e => e.Bio).HasMaxLength(1000);
            entity.Property(e => e.CompanyName).HasMaxLength(200);
            entity.Property(e => e.ContactPerson).HasMaxLength(200);
            entity.Property(e => e.WebsiteUrl).HasMaxLength(255);

            // Add indexes for frequently queried columns if needed
            entity.HasIndex(e => new { e.FirstName, e.LastName });
        });
        // Apply filter based on IUserAccessor
        //var userId = userAccessor.GetCurrentUserId();
        //modelBuilder.Entity<YourEntity>().HasQueryFilter(e => e.UserId == _userAccessor.GetCurrentUserId());
    }
}