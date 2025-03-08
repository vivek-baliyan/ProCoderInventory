using PCI.Domain.Models;

namespace PCI.Application.Services.Interfaces;

public interface ISessionManagementService
{
    Task<string> CreateSessionAsync(string userId, string ipAddress = null, string deviceInfo = null);
    Task EndSessionAsync(string sessionToken);
    Task EndAllUserSessionsAsync(string userId, string currentSessionToken = null);
    Task<bool> ValidateSessionAsync(string sessionToken);
    Task<List<SessionManagement>> GetUserActiveSessions(string userId);
}
