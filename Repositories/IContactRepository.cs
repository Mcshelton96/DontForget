using DontForget.Models;

namespace DontForget.Repositories
{
    public interface IContactRepository
    {
        void Add(Contact contact);
        void Delete(int id);
        List<Contact> GetAllContacts();
        Contact GetById(int id);
        void Update(Contact contact);
    }
}