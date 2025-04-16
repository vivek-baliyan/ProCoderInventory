namespace PCI.Shared.Common;

public record ApiResponse<T>
{
    public bool Success { get; set; }
    public T Data { get; set; }
    public List<ApiError> Errors { get; set; }
    public string Message { get; set; } = string.Empty;
}

public record ApiError(string Code, string Description);
