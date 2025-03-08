using Microsoft.AspNetCore.Mvc;
using PCI.Application.Services.Interfaces;
using PCI.Shared.Dtos;

namespace PCI.WebAPI.Controllers;

public class AppUserController(IIdentityService identityService) : BaseController
{
    [HttpPost("register")]
    public IActionResult Register()
    {
        return Ok();
    }

    [HttpGet("getById/{userId}")]
    public async Task<ActionResult<AppUserDto>> GetUserById(string userId)
    {
        var user = await identityService.GetUserById(userId);

        return Ok(user);
    }
}
