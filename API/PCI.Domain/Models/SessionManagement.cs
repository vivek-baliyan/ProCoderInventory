using PCI.Domain.Common;

namespace PCI.Domain.Models;

public class SessionManagement : BaseEntity
{
    public string UserId { get; set; }

    public string SessionToken { get; set; }

    public DateTime LoginTime { get; set; }

    public DateTime? LogoutTime { get; set; }

    public string DeviceInfo { get; set; }

    public string IpAddress { get; set; }

    public bool IsActive { get; set; }

    public virtual AppUser User { get; set; }
}