using System.ComponentModel.DataAnnotations;

namespace PCI.Domain.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [StringLength(255)]
        public string ProfileImageUrl { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [StringLength(100)]
        public string Country { get; set; }

        [StringLength(15)]
        public string MobileNumber { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(255)]
        public string StreetAddress { get; set; }

        [StringLength(100)]
        public string City { get; set; }

        [StringLength(100)]
        public string State { get; set; }

        [StringLength(20)]
        public string PostalCode { get; set; }

        public string Bio { get; set; }

        [StringLength(100)]
        public string CompanyName { get; set; }

        [StringLength(100)]
        public string ContactPerson { get; set; }

        [StringLength(255)]
        public string WebsiteUrl { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }

        public DateTime? LastLogin { get; set; }

        [StringLength(100)]
        public string LastLoginDevice { get; set; }

        public DateTime? LastPasswordChange { get; set; }

        // Navigation properties
        public virtual ICollection<UserRole> UserRoles { get; set; } = [];
        public virtual ICollection<SessionManagement> Sessions { get; set; } = [];
    }
}
