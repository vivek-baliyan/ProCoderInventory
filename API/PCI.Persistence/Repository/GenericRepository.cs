using Microsoft.EntityFrameworkCore;
using PCI.Application.Repository;
using PCI.Domain.Models;
using PCI.Persistence.Context;

namespace PCI.Persistence.Repository;

public class GenericRepository<T>(DataContext context) : IGenericRepository<T> where T : BaseEntity
{
    public async Task<T> GetByIdAsync(int id)
    {
        return await context.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
        return await context.Set<T>().ToListAsync();
    }

    public void Add(T entity)
    {
        context.Set<T>().Add(entity);
    }

    public void Update(T entity)
    {
        context.Set<T>().Attach(entity);
        context.Entry(entity).State = EntityState.Modified;
    }

    public void Delete(T entity)
    {
        context.Set<T>().Remove(entity);
    }
}
