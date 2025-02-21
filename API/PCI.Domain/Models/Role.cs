using System.ComponentModel.DataAnnotations;

namespace PCI.Domain.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string RoleName { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = [];
    }
}