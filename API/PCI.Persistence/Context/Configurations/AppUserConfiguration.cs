using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PCI.Domain.Models;

namespace PCI.Persistence.Context.Configurations;

public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.ToTable("Users");
        builder.Property(u => u.FirstName).HasMaxLength(100).IsRequired();
        builder.Property(u => u.LastName).HasMaxLength(100);
        builder.Property(u => u.ProfileImageUrl).HasMaxLength(255);
        builder.Property(u => u.Country).HasMaxLength(100);
        builder.Property(u => u.StreetAddress).HasMaxLength(255);
        builder.Property(u => u.State).HasMaxLength(100);
        builder.Property(u => u.City).HasMaxLength(100);
        builder.Property(u => u.PostalCode).HasMaxLength(20);
        builder.Property(u => u.CompanyName).HasMaxLength(100);
        builder.Property(u => u.ContactPerson).HasMaxLength(100);
        builder.Property(u => u.WebsiteUrl).HasMaxLength(255);
        builder.Property(u => u.Bio).HasMaxLength(500);
        builder.Property(u => u.LastLoginDevice).HasMaxLength(100);
        builder.HasIndex(u => u.Email).IsUnique();
    }
}