using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PCI.Domain.Models
{
    public class SessionManagement
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        [StringLength(255)]
        public string SessionToken { get; set; } // Unique token for session identification

        [Required]
        public DateTime LoginTime { get; set; }

        public DateTime? LogoutTime { get; set; }

        [StringLength(100)]
        public string DeviceInfo { get; set; } // e.g., "Apple Safari"

        [StringLength(45)]
        public string IpAddress { get; set; } // IPv4 or IPv6 address

        public bool IsActive { get; set; } // True if session is active, False if expired/logged out

        public virtual User User { get; set; }
    }
}