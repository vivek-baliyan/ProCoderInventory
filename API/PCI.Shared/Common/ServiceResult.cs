namespace PCI.Shared.Common;

public record ServiceResult<TResult>
{
    public TResult ResultData { get; init; }

    private readonly List<Problem> _problems = [];

    public List<Problem> Problems
    {
        get => _problems;
        set
        {
            _problems.AddRange(value);
        }
    }

    public static ServiceResult<TResult> Error(params Problem[] problems)
    {
        return new() { Problems = problems != null ? [.. problems] : [] };
    }

    public static ServiceResult<TResult> Errors(List<Problem> problems)
    {
        return new() { Problems = problems != null ? [.. problems] : [] };
    }

    public static ServiceResult<TResult> Success(TResult result)
    {
        return new() { ResultData = result };
    }

    public bool Failed => Problems.Count > 0;

    public bool Succeeded => !Failed;
}

public record Problem(string Code, string Description);
