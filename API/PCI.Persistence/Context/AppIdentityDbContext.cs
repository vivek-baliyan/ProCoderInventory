using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PCI.Domain.Models;

namespace PCI.Persistence.Context;

public class AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : IdentityDbContext<AppUser, AppRole, string>(options)
{
    public DbSet<SessionManagement> Sessions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        #region Identity tables configuration
        // Ignore unwanted Identity entities
        modelBuilder.Ignore<IdentityUserClaim<string>>();
        modelBuilder.Ignore<IdentityUserLogin<string>>();
        modelBuilder.Ignore<IdentityUserToken<string>>();
        modelBuilder.Ignore<IdentityRoleClaim<string>>();

        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.ToTable("Users", "Auth");
            entity.Property(u => u.FirstName).HasMaxLength(100).IsRequired();
            entity.Property(u => u.LastName).HasMaxLength(100);
            entity.Property(u => u.ProfileImageUrl).HasMaxLength(255);
            entity.Property(u => u.Country).HasMaxLength(100);
            entity.Property(u => u.StreetAddress).HasMaxLength(255);
            entity.Property(u => u.State).HasMaxLength(100);
            entity.Property(u => u.City).HasMaxLength(100);
            entity.Property(u => u.PostalCode).HasMaxLength(20);
            entity.Property(u => u.CompanyName).HasMaxLength(100);
            entity.Property(u => u.ContactPerson).HasMaxLength(100);
            entity.Property(u => u.WebsiteUrl).HasMaxLength(255);
            entity.Property(u => u.Bio).HasMaxLength(500);
            entity.Property(u => u.LastLoginDevice).HasMaxLength(100);
            entity.HasIndex(u => u.Email).IsUnique();
        });

        modelBuilder.Entity<AppRole>().ToTable("Roles", "Auth");

        modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles", "Auth");

        modelBuilder.Entity<AppUserRole>().Property(r => r.IsDeleted);
        #endregion

        modelBuilder.Entity<SessionManagement>(entity =>
        {
            entity.ToTable("Sessions", "Auth");
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