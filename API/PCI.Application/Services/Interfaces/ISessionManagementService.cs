using PCI.Domain.Models;
using PCI.Shared.Common;

namespace PCI.Application.Services.Interfaces;

public interface ISessionManagementService
{
    Task<ServiceResult<string>> CreateSessionAsync(string userId, string ipAddress = null, string deviceInfo = null);
    Task EndSessionAsync(string sessionToken);
    Task EndAllUserSessionsAsync(string userId, string currentSessionToken = null);
    Task<ServiceResult<bool>> ValidateSessionAsync(string sessionToken);
    Task<ServiceResult<List<SessionManagement>>> GetUserActiveSessions(string userId);
}
