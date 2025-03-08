using Microsoft.AspNetCore.Identity;

namespace PCI.Domain.Models;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string ProfileImageUrl { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string Country { get; set; }

    public string StreetAddress { get; set; }

    public string City { get; set; }

    public string State { get; set; }

    public string PostalCode { get; set; }

    public string Bio { get; set; }

    public string CompanyName { get; set; }

    public string ContactPerson { get; set; }

    public string WebsiteUrl { get; set; }

    public DateTime? LastLogin { get; set; }

    public string LastLoginDevice { get; set; }

    public DateTime? LastPasswordChange { get; set; }

    public DateTime CreatedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public bool IsDeleted { get; set; }

    public virtual ICollection<IdentityUserRole<string>> UserRoles { get; set; } = [];
    public virtual ICollection<SessionManagement> Sessions { get; set; } = [];
}