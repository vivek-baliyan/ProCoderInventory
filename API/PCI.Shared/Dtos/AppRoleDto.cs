namespace PCI.Shared.Dtos;

public record AppRoleDto
{
    public string Id { get; init; }
    public string Name { get; init; }
    public bool IsDeleted { get; init; }
}