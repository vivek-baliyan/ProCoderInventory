using Microsoft.AspNetCore.Mvc;
using PCI.Shared.Common;

namespace PCI.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseController : ControllerBase
{
    protected ApiResponse<T> SuccessResponse<T>(ServiceResult<T> result)
    {
        return new ApiResponse<T>
        {
            Success = true,
            Data = result.ResultData,
        };
    }

    protected ApiResponse<T> SuccessResponse<T>(T data, string message)
    {
        return new ApiResponse<T>
        {
            Success = true,
            Data = data,
            Message = message,
        };
    }

    protected ApiResponse<T> ErrorResponse<T>(ServiceResult<T> result)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Errors = result.Problems.Select(p =>
                new ApiError(p.Code, p.Description)).ToList()
        };
    }

    protected ApiResponse<object> ErrorResponse(string errorDescription, string message)
    {
        return new ApiResponse<object>
        {
            Success = false,
            Errors = [new ApiError("ErrorOccurred", errorDescription)],
            Message = message
        };
    }
}
