using PCI.Application.Repositories;
using PCI.Application.Services.Interfaces;
using PCI.Domain.Models;

namespace PCI.Application.Services.Implementations;

public class SessionManagementService(IUnitOfWork unitOfWork) : ISessionManagementService
{
    public async Task<string> CreateSessionAsync(string userId, string ipAddress = null, string deviceInfo = null)
    {
        var sessionToken = Guid.NewGuid().ToString();

        var session = new SessionManagement
        {
            UserId = userId,
            SessionToken = sessionToken,
            DeviceInfo = deviceInfo,
            IpAddress = ipAddress,
            LoginTime = DateTime.UtcNow,
            IsActive = true,
            CreatedOn = DateTime.UtcNow
        };

        unitOfWork.Repository<SessionManagement>().Add(session);
        await unitOfWork.SaveChangesAsync();

        return sessionToken;
    }

    public async Task EndSessionAsync(string sessionToken)
    {
        var session = await unitOfWork.Repository<SessionManagement>().GetFirstOrDefaultAsync(s => s.SessionToken == sessionToken && s.IsActive);

        if (session != null)
        {
            session.LogoutTime = DateTime.UtcNow;
            session.IsActive = false;
            session.UpdatedOn = DateTime.UtcNow;

            unitOfWork.Repository<SessionManagement>().Update(session);
            await unitOfWork.SaveChangesAsync();
        }
    }

    public async Task EndAllUserSessionsAsync(string userId, string currentSessionToken = null)
    {
        var sessions = await unitOfWork.Repository<SessionManagement>()
            .GetFilteredAsync(s => s.UserId == userId && s.IsActive && s.SessionToken != currentSessionToken);

        foreach (var session in sessions)
        {
            session.LogoutTime = DateTime.UtcNow;
            session.IsActive = false;
            session.UpdatedOn = DateTime.UtcNow;

            unitOfWork.Repository<SessionManagement>().Update(session);
        }

        await unitOfWork.SaveChangesAsync();

    }

    public async Task<bool> ValidateSessionAsync(string sessionToken)
    {
        return await unitOfWork.Repository<SessionManagement>()
            .AnyAsync(s => s.SessionToken == sessionToken && s.IsActive);

    }

    public async Task<List<SessionManagement>> GetUserActiveSessions(string userId)
    {
        var sessions = await unitOfWork.Repository<SessionManagement>()
            .GetFilteredAsync(s => s.UserId == userId && s.IsActive);

        return [.. sessions.OrderByDescending(s => s.LoginTime)];
    }
}
