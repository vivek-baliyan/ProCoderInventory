namespace PCI.Application.Services.Interfaces;

public interface IUserAccessorService
{
    string GetCurrentUserId();
    void SetCurrentUserId(string userId);
}