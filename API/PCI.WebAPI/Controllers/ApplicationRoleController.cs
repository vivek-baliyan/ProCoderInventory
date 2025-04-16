using Microsoft.AspNetCore.Mvc;
using PCI.Application.Services.Interfaces;
using PCI.Shared.Dtos;

namespace PCI.WebAPI.Controllers;

public class ApplicationRoleController(IIdentityService identityService) : BaseController
{
    [HttpPost("createRole")]
    public async Task<IActionResult> CreateRole(AddAppRoleDto role)
    {
        var result = await identityService.CreateRole(role);

        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ErrorResponse(result));
        }

        return StatusCode(StatusCodes.Status200OK, SuccessResponse(result));

    }

    [HttpGet("getAllRoles")]
    public async Task<IActionResult> GetAllRoles()
    {
        var result = await identityService.GetAllRoles();

        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ErrorResponse(result));
        }

        return StatusCode(StatusCodes.Status200OK, SuccessResponse(result));
    }

    [HttpGet("getById/{roleName}")]
    public async Task<IActionResult> GetRoleByName(string roleName)
    {
        var result = await identityService.GetRoleByName(roleName);

        if (!result.Succeeded)
        {
            return StatusCode(StatusCodes.Status400BadRequest, ErrorResponse(result));
        }

        return StatusCode(StatusCodes.Status200OK, SuccessResponse(result));
    }
}
