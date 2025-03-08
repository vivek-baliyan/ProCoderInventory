using PCI.Domain.Common;
using System.Linq.Expressions;

namespace PCI.Application.Repositories;

public interface IGenericRepository<T> where T : BaseEntity
{
    void Add(T entity);
    void Update(T entity);
    void Remove(T entity);
    void RemoveRange(T entity);
    Task<IEnumerable<T>> GetAllAsync(string includeroperties = null);
    Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filter, string includeroperties = null);
    Task<IEnumerable<T>> GetFilteredAsync(Expression<Func<T, bool>> filter, string includeroperties = null);
    Task<bool> AnyAsync(Expression<Func<T, bool>> filter);
}
