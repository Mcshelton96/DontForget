using DontForget.Models;

namespace DontForget.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        void Delete(int id);
        List<User> GetAll();
        User GetById(int id);
        void Update(User user);
    }
}