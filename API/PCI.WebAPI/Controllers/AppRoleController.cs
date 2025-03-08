using Microsoft.AspNetCore.Mvc;
using PCI.Application.Services.Interfaces;
using PCI.Shared.Dtos;

namespace PCI.WebAPI.Controllers;

public class AppRoleController(IIdentityService identityService) : BaseController
{

    [HttpGet("getAllRoles")]
    public async Task<ActionResult<AppRoleDto>> GetRoleById()
    {
        var roles = await identityService.GetAllRoles();

        return Ok(roles);
    }

    [HttpGet("getById/{roleName}")]
    public async Task<ActionResult<AppRoleDto>> GetRoleById(string roleName)
    {
        var role = await identityService.GetRoleByName(roleName);

        return Ok(role);
    }

    [HttpPost("createRole")]
    public async Task<ActionResult> CreateRole(AddAppRoleDto role)
    {
        _ = await identityService.CreateRole(role);

        return Ok();
    }

}
