namespace PCI.Shared.Dtos;

public record AppUserDto
{
    public string Id { get; init; }

    public string FirstName { get; init; }

    public string LastName { get; init; }

    public string ProfileImageUrl { get; init; }

    public DateTime? DateOfBirth { get; init; }

    public string Country { get; init; }

    public string StreetAddress { get; init; }

    public string City { get; init; }

    public string State { get; init; }

    public string PostalCode { get; init; }

    public string Bio { get; init; }

    public string CompanyName { get; init; }

    public string ContactPerson { get; init; }

    public string WebsiteUrl { get; init; }

    public DateTime? LastLogin { get; init; }

    public string LastLoginDevice { get; init; }

    public DateTime? LastPasswordChange { get; init; }

    public bool IsDeleted { get; init; }
}
