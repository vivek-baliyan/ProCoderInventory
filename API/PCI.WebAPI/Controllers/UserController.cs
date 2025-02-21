using Microsoft.AspNetCore.Mvc;
using PCI.Application.Repository;
using PCI.Domain.Models;

namespace PCI.WebAPI.Controllers;

public class UserController(IUnitOfWork unitOfWork) : BaseController
{
    [HttpPost("register")]
    public IActionResult Register()
    {
        return Ok();
    }

    [HttpGet("getAll")]
    public async Task<ActionResult<IReadOnlyList<User>>> GetAllUsersAsync()
    {
        var users = await unitOfWork.Repository<User>().ListAllAsync();

        return Ok(users);
    }
}
