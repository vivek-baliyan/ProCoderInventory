using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PCI.Domain.Models;

namespace PCI.Persistence.Context;

public class AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : IdentityDbContext<AppUser, AppRole, string>(options)
{
    public DbSet<SessionManagement> Sessions { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Set schema for all tables
        modelBuilder.HasDefaultSchema("AUTH");

        #region Identity tables configuration
        // Ignore unwanted Identity entities
        modelBuilder.Ignore<IdentityUserClaim<string>>();
        modelBuilder.Ignore<IdentityUserLogin<string>>();
        modelBuilder.Ignore<IdentityUserToken<string>>();
        modelBuilder.Ignore<IdentityRoleClaim<string>>();

        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.ToTable("Users");
            entity.Property(u => u.LastLoginDevice).HasMaxLength(255);
        });

        modelBuilder.Entity<AppRole>().ToTable("Roles");

        modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");

        modelBuilder.Entity<AppUserRole>().Property(r => r.IsDeleted);
        #endregion

        modelBuilder.Entity<SessionManagement>(entity =>
        {
            entity.ToTable("Sessions");
            entity.Property(s => s.SessionToken).IsRequired().HasMaxLength(255);
            entity.Property(s => s.DeviceInfo).HasMaxLength(100);
            entity.Property(s => s.IpAddress).HasMaxLength(50);
            entity.HasOne(s => s.User)
                .WithMany(u => u.Sessions)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}