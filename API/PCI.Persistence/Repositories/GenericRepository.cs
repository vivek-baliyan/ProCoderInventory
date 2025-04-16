using Microsoft.EntityFrameworkCore;
using PCI.Application.Repositories;
using PCI.Domain.Common;
using PCI.Persistence.Context;
using System.Linq.Expressions;

namespace PCI.Persistence.Repositories;

public class GenericRepository<T>(ApplicationDbContext context) : IGenericRepository<T> where T : BaseEntity
{
    private readonly ApplicationDbContext _context = context;
    private readonly DbSet<T> _dbSet = context.Set<T>();

    public void Add(T entity)
    {
        _dbSet.Add(entity);
    }

    public void Update(T entity)
    {
        _dbSet.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
    }

    public void Remove(T entity)
    {
        _dbSet.Remove(entity);
    }

    public void RemoveRange(T entity)
    {
        _dbSet.RemoveRange(entity);
    }

    public async Task<IEnumerable<T>> GetAllAsync(string includeroperties = null)
    {
        IQueryable<T> query = _dbSet;
        if (includeroperties != null)
        {
            foreach (var includeProp in includeroperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProp);
            }
        }
        return await query.ToListAsync();
    }

    public async Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> filter, string includeroperties = null)
    {
        IQueryable<T> query = _dbSet.Where(filter);
        if (includeroperties != null)
        {
            foreach (var includeProp in includeroperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProp);
            }
        }
        return await query.FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<T>> GetFilteredAsync(Expression<Func<T, bool>> filter, string includeroperties = null)
    {
        IQueryable<T> query = _dbSet.Where(filter);
        if (includeroperties != null)
        {
            foreach (var includeProp in includeroperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProp);
            }
        }
        return await query.ToListAsync();
    }

    public async Task<bool> AnyAsync(Expression<Func<T, bool>> filter)
    {
        return await _dbSet.AnyAsync(filter);
    }
}
