using PCI.Application.Services.Interfaces;

namespace PCI.Application.Services.Implementations;

public class UserAccessorService : IUserAccessorService
{
    private string _currentUserId;

    public string GetCurrentUserId() => _currentUserId;
    public void SetCurrentUserId(string userId) => _currentUserId = userId;
}
