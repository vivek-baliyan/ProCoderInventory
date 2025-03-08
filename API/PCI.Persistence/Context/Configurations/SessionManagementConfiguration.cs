using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PCI.Domain.Models;

namespace PCI.Persistence.Context.Configurations;

public class SessionManagementConfiguration : IEntityTypeConfiguration<SessionManagement>
{
    public void Configure(EntityTypeBuilder<SessionManagement> builder)
    {
        builder.Property(s => s.SessionToken).IsRequired().HasMaxLength(255);
        builder.Property(s => s.DeviceInfo).HasMaxLength(100);
        builder.Property(s => s.IpAddress).HasMaxLength(50);

        builder.HasOne(s => s.User)
            .WithMany(u => u.Sessions)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}