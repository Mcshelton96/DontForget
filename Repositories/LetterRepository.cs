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
                       SELECT Id, userId, letterTitle, letterBody
                       FROM letter";

                    var reader = cmd.ExecuteReader();

                    var letters = new List<Letter>();
                    while (reader.Read())
                    {
                        letters.Add(new Letter()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            LetterTitle = DbUtils.GetString(reader, "letterTitle"),
                            LetterBody = DbUtils.GetString(reader, "letterBody"),

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
                          SELECT Id, UserId, LetterTitle, LetterBody
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
                        INSERT INTO Letter (userId, letterTitle, letterBody)
                        OUTPUT INSERTED.ID
                        VALUES (@userId, @letterTitle, @letterBody)";

                    DbUtils.AddParameter(cmd, "@userId", letter.UserId);
                    DbUtils.AddParameter(cmd, "@letterTitle", letter.LetterTitle);
                    DbUtils.AddParameter(cmd, "@letterBody", letter.LetterBody);

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
                        UPDATE letter
                           SET letterTitle = @letterTitle,
                               letterBody = @letterBody
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@letterTitle", letter.LetterTitle);
                    DbUtils.AddParameter(cmd, "@letterBody", letter.LetterBody);
                    DbUtils.AddParameter(cmd, "@Id", letter.Id);



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
                    cmd.CommandText = "DELETE FROM letter WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
