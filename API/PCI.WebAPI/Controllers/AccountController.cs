using Microsoft.AspNetCore.Mvc;
using PCI.Application.Services.Interfaces;
using PCI.Shared.Dtos;

namespace PCI.WebAPI.Controllers;

public class AccountController(IIdentityService identityService, IAccountService accountService) : BaseController
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
                return StatusCode(StatusCodes.Status400BadRequest, result);
            }

            try
            {
                var userResponse = await _identityService.GetUserByEmail(registerUserDto.Email);
                if (!userResponse.Succeeded)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, ErrorResponse(userResponse));
                }

                // 2. Create the user profile in the application database
                var userProfile = await _accountService.CreateUserProfile(userResponse.ResultData.Id, registerUserDto);

                if (!userProfile.Succeeded)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, ErrorResponse(userProfile));
                }

                return StatusCode(StatusCodes.Status200OK,
                    SuccessResponse(userProfile.ResultData.UserId, "User profile created successfully."));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    ErrorResponse(ex.ToString(), $"An error occurred while creating user profile: {ex.Message}"));
            }
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                ErrorResponse(ex.ToString(), $"An error occurred during registration: {ex.Message}"));
        }
    }
}