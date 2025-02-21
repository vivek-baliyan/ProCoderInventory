using PCI.Application.Repository;
using PCI.Domain.Models;
using PCI.Persistence.Context;

namespace PCI.Persistence.Repository;

public class UserRepository(DataContext context) : GenericRepository<User>(context), IUserRepository
{
}
