using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using DontForget.Models;
using DontForget.Utils;

namespace DontForget.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, name, userName, email, address, firebasekey
                            FROM [user]
                            "
                    ;

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "name"),
                            userName = DbUtils.GetString(reader, "userName"),
                            Email = DbUtils.GetString(reader, "email"),
                            Address = DbUtils.GetString(reader, "address"),
                            FireBaseKey = DbUtils.GetString(reader, "firebasekey")
                        });
                    }

                    reader.Close();

                    return users;
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
                          SELECT Id, name, userName, email, address, firebasekey
                            FROM [User]
                            WHERE Id = @Id
                            ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "name"),
                            userName = DbUtils.GetString(reader, "userName"),
                            Email = DbUtils.GetString(reader, "email"),
                            Address = DbUtils.GetString(reader, "address"),
                            FireBaseKey = DbUtils.GetString(reader, "firebasekey")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public User? GetByFireBaseKey(string firebasekey)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, name, userName, email, address, firebasekey
                            FROM [user]
                            WHERE firebasekey = @firebasekey
                            ";

                    DbUtils.AddParameter(cmd, "@firebasekey", firebasekey);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "name"),
                            userName = DbUtils.GetString(reader, "userName"),
                            Email = DbUtils.GetString(reader, "email"),
                            Address = DbUtils.GetString(reader, "address"),
                            FireBaseKey = DbUtils.GetString(reader, "firebasekey")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }



        //public User GetByFirebaseUid(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {

        //        }
        //    }
        //}

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [user] (name, userName, email, address, firebasekey)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @userName, @email, @address, @firebasekey)";

                    DbUtils.AddParameter(cmd, "@name", user.Name);
                    DbUtils.AddParameter(cmd, "@userName", user.userName);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@address", user.Address);
                    DbUtils.AddParameter(cmd, "@firebasekey", user.FireBaseKey);


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
                        UPDATE [user]
                           SET name = @name,
                               userName = @userName,
                               email = @email,
                               address = @address
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@name", user.Name);
                    DbUtils.AddParameter(cmd, "@userName", user.userName);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@address", user.Address);
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
                    cmd.CommandText = "DELETE FROM [user] WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
