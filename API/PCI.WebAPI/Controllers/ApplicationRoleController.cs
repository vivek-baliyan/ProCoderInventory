using Microsoft.AspNetCore.Mvc;
using PCI.Application.Services.Interfaces;
using PCI.Shared.Dtos;

namespace PCI.WebAPI.Controllers;

public class ApplicationRoleController(IIdentityService identityService) : BaseController
{
    [HttpPost("createRole")]
    public async Task<ActionResult> CreateRole(AddAppRoleDto role)
    {
        var result = await identityService.CreateRole(role);

        return Ok();
    }

    [HttpGet("getAllRoles")]
    public async Task<ActionResult<IReadOnlyList<AppRoleDto>>> GetAllRoles()
    {
        var roles = await identityService.GetAllRoles();

        return Ok(roles);
    }

    [HttpGet("getById/{roleName}")]
    public async Task<ActionResult<AppRoleDto>> GetRoleByName(string roleName)
    {
        var role = await identityService.GetRoleByName(roleName);

        return Ok(role);
    }
}
