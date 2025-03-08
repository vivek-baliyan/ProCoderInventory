using PCI.Application.Repositories;
using PCI.Domain.Common;
using PCI.Persistence.Context;
using System.Collections.Concurrent;

namespace PCI.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork, IDisposable
{
    private ConcurrentDictionary<string, object> _repositories;
    private bool _disposed;
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context, IIdentityRepository identityRepository)
    {
        _context = context;
        IdentityRepository = identityRepository;
    }

    public IIdentityRepository IdentityRepository { get; private set; }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
    {
        _repositories ??= new ConcurrentDictionary<string, object>();

        var type = typeof(TEntity).Name;

        return (IGenericRepository<TEntity>)_repositories.GetOrAdd(type, _ =>
        Activator.CreateInstance(typeof(GenericRepository<>).MakeGenericType(typeof(TEntity)), _context)!);
    }

    public void Dispose()
    {
        if (!_disposed)
        {
            _context.Dispose();
            _disposed = true;
        }
    }
}
