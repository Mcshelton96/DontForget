using DontForget.Models;

namespace DontForget.Repositories
{
    public interface ILetterRepository
    {
        void Add(Letter letter);
        void Delete(int id);
        List<Letter> GetAllLettersByUser(int id);
        Letter GetById(int id);
        void Update(Letter letter);
    }
}