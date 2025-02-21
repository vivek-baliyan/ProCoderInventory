using System.ComponentModel.DataAnnotations;

namespace PCI.Domain.Models
{
    public class Role : BaseEntity
    {
        [Required] [StringLength(50)] public string RoleName { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = [];
    }
}
