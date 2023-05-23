using DontForget.Models;
using DontForget.Utils;

namespace DontForget.Repositories
{
    public class ContactRepository : BaseRepository
    {
        public ContactRepository(IConfiguration configuration) : base(configuration) { }

        public List<Contact> GetAllContacts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, contactName, contactMembers, contactAddress, contactBirthday
                            FROM contact
                            "
                    ;

                    var reader = cmd.ExecuteReader();

                    var contacts = new List<Contact>();
                    while (reader.Read())
                    {
                        contacts.Add(new Contact()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ContactName = DbUtils.GetString(reader, "contactName"),
                            ContactMembers = DbUtils.GetString(reader, "contactMembers"),
                            ContactAddress = DbUtils.GetString(reader, "contactAddress"),
                            ContactBirthday = DbUtils.GetDateTime(reader, "contactBirthday"),
                        });
                    }

                    reader.Close();

                    return contacts;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name, userName, Email, Address
                            FROM User
                            ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            userName = DbUtils.GetString(reader, "userName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Address = DbUtils.GetString(reader, "Address"),
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO User (Name, userName, Email, Address)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @userName, @Email, @Address)";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@userName", user.userName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Address", user.Address);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                           SET Name = @Name,
                               username = @userName,
                               Email = @Email,
                               Address = @Address,
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@userName", user.userName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Address", user.Address);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
