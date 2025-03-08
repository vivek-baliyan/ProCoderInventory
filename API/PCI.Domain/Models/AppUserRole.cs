using Microsoft.AspNetCore.Identity;

namespace PCI.Domain.Models;

public class AppUserRole : IdentityUserRole<string>
{
    public bool IsDeleted { get; set; }
}