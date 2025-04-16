namespace PCI.Shared.Dtos;

public class RegisterUserDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ProfileImageUrl { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string Country { get; set; }
    public string StreetAddress { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }
    public string Bio { get; set; }
    public string CompanyName { get; set; }
    public string ContactPerson { get; set; }
    public string WebsiteUrl { get; set; }
    public bool SignInAfterRegistration { get; set; } = true;
}