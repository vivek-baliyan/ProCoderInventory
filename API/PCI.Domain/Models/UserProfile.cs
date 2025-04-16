using PCI.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace PCI.Domain.Models;

public class UserProfile : BaseEntity
{
    [Key]
    public string UserId { get; set; } // Foreign key to Identity's AspNetUsers table

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
}