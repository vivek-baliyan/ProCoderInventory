using PCI.Domain.Models;

namespace PCI.Application.Services.Interfaces;

public interface IIdentityService
{
    Task<AppUser> GetUserById(string userId);
}
