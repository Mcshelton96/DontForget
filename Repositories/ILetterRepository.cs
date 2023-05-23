using DontForget.Models;

namespace DontForget.Repositories
{
    public interface ILetterRepository
    {
        void Add(Letter letter);
        void Delete(int id);
        List<Letter> GetAllLetters();
        Letter GetById(int id);
        void Update(Letter letter);
    }
}