using PCI.Application.Repositories;
using PCI.Application.Services.Interfaces;
using PCI.Domain.Models;
using PCI.Shared.Common;

namespace PCI.Application.Services.Implementations;

public class SessionManagementService(IUnitOfWork unitOfWork) : ISessionManagementService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<ServiceResult<string>> CreateSessionAsync(string userId, string ipAddress = null, string deviceInfo = null)
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

        _unitOfWork.Repository<SessionManagement>().Add(session);
        await _unitOfWork.SaveChangesAsync();

        return ServiceResult<string>.Success(sessionToken);
    }

    public async Task EndSessionAsync(string sessionToken)
    {
        var session = await _unitOfWork.Repository<SessionManagement>().GetFirstOrDefaultAsync(s => s.SessionToken == sessionToken && s.IsActive);

        if (session != null)
        {
            session.LogoutTime = DateTime.UtcNow;
            session.IsActive = false;
            session.UpdatedOn = DateTime.UtcNow;

            _unitOfWork.Repository<SessionManagement>().Update(session);
            await _unitOfWork.SaveChangesAsync();
        }
    }

    public async Task EndAllUserSessionsAsync(string userId, string currentSessionToken = null)
    {
        var sessions = await _unitOfWork.Repository<SessionManagement>()
            .GetFilteredAsync(s => s.UserId == userId && s.IsActive && s.SessionToken != currentSessionToken);

        foreach (var session in sessions)
        {
            session.LogoutTime = DateTime.UtcNow;
            session.IsActive = false;
            session.UpdatedOn = DateTime.UtcNow;

            _unitOfWork.Repository<SessionManagement>().Update(session);
        }

        await _unitOfWork.SaveChangesAsync();

    }

    public async Task<ServiceResult<bool>> ValidateSessionAsync(string sessionToken)
    {
        var session = await _unitOfWork.Repository<SessionManagement>()
            .GetFirstOrDefaultAsync(s => s.SessionToken == sessionToken && s.IsActive);
        if (session == null)
        {
            return ServiceResult<bool>.Error(new Problem("SessionNotFound", "Session not found or inactive."));
        }

        var isValid = session.LogoutTime == null && session.IsActive;
        return ServiceResult<bool>.Success(isValid);
    }

    public async Task<ServiceResult<List<SessionManagement>>> GetUserActiveSessions(string userId)
    {
        var sessions = await _unitOfWork.Repository<SessionManagement>()
            .GetFilteredAsync(s => s.UserId == userId && s.IsActive);

        return ServiceResult<List<SessionManagement>>.Success([.. sessions.OrderByDescending(s => s.LoginTime)]);
    }
}
