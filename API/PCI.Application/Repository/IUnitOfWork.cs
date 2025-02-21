using PCI.Domain.Models;

namespace PCI.Application.Repository;

public interface IUnitOfWork
{
    IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
    Task<int> SaveChangesAsync();
}
