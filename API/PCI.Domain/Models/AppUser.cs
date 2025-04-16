using Microsoft.AspNetCore.Identity;

namespace PCI.Domain.Models;

public class AppUser : IdentityUser
{
    public DateTime CreatedOn { get; set; }
    public DateTime? LastLogin { get; set; }
    public string LastLoginDevice { get; set; }
    public DateTime? LastPasswordChange { get; set; }
    public bool IsDeleted { get; set; }

    public virtual ICollection<IdentityUserRole<string>> UserRoles { get; set; } = [];
    public virtual ICollection<SessionManagement> Sessions { get; set; } = [];
}