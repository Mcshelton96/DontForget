﻿using DontForget.Models;
using DontForget.Utils;

namespace DontForget.Repositories
{
    public class ContactRepository : BaseRepository, IContactRepository
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
                          SELECT Id, userId, contactName, contactMembers, contactAddress, contactBirthday
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
                            UserId = DbUtils.GetInt(reader,"userId"),
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

        public Contact GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, userId, contactName, contactMembers, contactAddress, contactBirthday
                            FROM contact
                            WHERE Id = @Id
                            ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Contact contact = null;
                    if (reader.Read())
                    {
                        contact = new Contact()
                        {
                            Id = id,
                            UserId = DbUtils.GetInt(reader, "userId"),
                            ContactName = DbUtils.GetString(reader, "contactName"),
                            ContactMembers = DbUtils.GetString(reader, "contactMembers"),
                            ContactAddress = DbUtils.GetString(reader, "contactAddress"),
                            ContactBirthday = DbUtils.GetDateTime(reader, "contactBirthday"),
                        };
                    }

                    reader.Close();

                    return contact;
                }
            }
        }

        public void Add(Contact contact)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Contact (userId, contactName, contactMembers, contactAddress, contactBirthday)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @contactName, @contactMembers, @contactAddress, @contactBirthday)";

                    DbUtils.AddParameter(cmd, "@userId", contact.UserId);
                    DbUtils.AddParameter(cmd, "@contactName", contact.ContactName);
                    DbUtils.AddParameter(cmd, "@contactMembers", contact.ContactMembers);
                    DbUtils.AddParameter(cmd, "@contactAddress", contact.ContactAddress);
                    DbUtils.AddParameter(cmd, "@contactBirthday", contact.ContactBirthday);

                    contact.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Contact contact)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Contact
                           SET userId = @userId,
                               contactName = @contactName,
                               contactMembers = @contactMembers,
                               contactAddress = @contactAddress,
                               contactBirthday = @contactBirthday
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@userId", contact.UserId);
                    DbUtils.AddParameter(cmd, "@contactName", contact.ContactName);
                    DbUtils.AddParameter(cmd, "@contactMembers", contact.ContactMembers);
                    DbUtils.AddParameter(cmd, "@contactAddress", contact.ContactAddress);
                    DbUtils.AddParameter(cmd, "@contactBirthday", contact.ContactBirthday);
                    DbUtils.AddParameter(cmd, "@Id", contact.Id);

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
                    cmd.CommandText = "DELETE FROM Contact WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
