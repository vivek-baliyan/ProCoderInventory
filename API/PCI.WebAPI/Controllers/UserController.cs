using Microsoft.AspNetCore.Mvc;
using PCI.Application.Services.Interfaces;
using PCI.Domain.Models;

namespace PCI.WebAPI.Controllers;

public class UserController(IIdentityService identityService) : BaseController
{
    [HttpPost("register")]
    public IActionResult Register()
    {
        return Ok();
    }

    [HttpGet("getById/{userId}")]
    public async Task<ActionResult<AppUser>> GetUserById(string userId)
    {
        var user = await identityService.GetUserById(userId);

        return Ok(user);
    }
}
