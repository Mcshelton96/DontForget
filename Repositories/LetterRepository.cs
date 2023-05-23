using DontForget.Models;
using DontForget.Utils;
using Microsoft.Extensions.Hosting;

namespace DontForget.Repositories
{
    public class LetterRepository : BaseRepository, ILetterRepository
    {
        public LetterRepository(IConfiguration configuration) : base(configuration) { }

        public List<Letter> GetAllLetters()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, UserId, LetterTitle, LetterBody,
                       FROM Letter";

                    var reader = cmd.ExecuteReader();

                    var letters = new List<Letter>();
                    while (reader.Read())
                    {
                        letters.Add(new Letter()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            LetterTitle = DbUtils.GetString(reader, "LetterTitle"),
                            LetterBody = DbUtils.GetString(reader, "LetterBody"),

                        });
                    }
                    reader.Close();
                    return letters;
                }
            }
        }
        public Letter GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, UserId, LetterTitle, LetterBody,
                            FROM Letter
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Letter letter = null;
                    if (reader.Read())
                    {
                        letter = new Letter()
                        {
                            Id = id,
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            LetterTitle = DbUtils.GetString(reader, "LetterTitle"),
                            LetterBody = DbUtils.GetString(reader, "LetterBody"),
                        };
                    }

                    reader.Close();

                    return letter;
                }
            }
        }
        public void Add(Letter letter)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Letter (UserId, LetterTitle, LetterBody)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @LetterTitle, @LetterBody)";

                    DbUtils.AddParameter(cmd, "@UserId", letter.UserId);
                    DbUtils.AddParameter(cmd, "@LetterTitle", letter.LetterTitle);
                    DbUtils.AddParameter(cmd, "@LetterBody", letter.LetterBody);

                    letter.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Letter letter)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Letter
                           SET LetterTitle = @LetterTitle,
                               LetterBody = @LetterBody,
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@LetterTitle", letter.LetterTitle);
                    DbUtils.AddParameter(cmd, "@LetterBody", letter.LetterBody);


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
