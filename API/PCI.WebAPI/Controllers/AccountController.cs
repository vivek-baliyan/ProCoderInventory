using Microsoft.AspNetCore.Mvc;
using PCI.Application.Services.Interfaces;
using PCI.Shared.Dtos;

namespace PCI.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController(IIdentityService identityService, IAccountService accountService) : ControllerBase
{
    private readonly IIdentityService _identityService = identityService;
    private readonly IAccountService _accountService = accountService;

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
    {
        try
        {
            // 1. Create the user in the identity database
            var result = await _identityService.CreateUser(registerUserDto);

            if (!result.Succeeded)
            {
                return BadRequest(result.Problems);
            }

            try
            {
                var userResponse = await _identityService.GetUserByEmail(registerUserDto.Email);
                if (!userResponse.Succeeded)
                {
                    return BadRequest(userResponse.Problems);
                }

                // 2. Create the user profile in the application database
                var userProfile = await _accountService.CreateUserProfile(userResponse.ResultData.Id, registerUserDto);

                return Ok(new { userId = userResponse.ResultData.Id, message = "Registration successful" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating user profile: {ex.Message}");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred during registration: {ex.Message}");
        }
    }
}