using System.Collections;
using PCI.Application.Repository;
using PCI.Domain.Models;
using PCI.Persistence.Context;

namespace PCI.Persistence.Repository;

public class UnitOfWork(DataContext context) : IUnitOfWork
{
    private Hashtable _repositories;

    public async Task<int> SaveChangesAsync()
    {
        return await context.SaveChangesAsync();
    }

    public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
    {
        _repositories ??= new Hashtable();

        var type = typeof(TEntity).Name;

        if (_repositories.ContainsKey(type))
            return ((IGenericRepository<TEntity>)_repositories[type])!;

        var repositoryType = typeof(GenericRepository<>);
        var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), context);

        _repositories.Add(type, repositoryInstance);

        return ((IGenericRepository<TEntity>)repositoryInstance)!;
    }
}
