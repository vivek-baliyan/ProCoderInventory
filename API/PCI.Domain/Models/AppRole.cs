using Microsoft.AspNetCore.Identity;

namespace PCI.Domain.Models;

public class AppRole : IdentityRole
{
    public bool IsDeleted { get; set; }
}