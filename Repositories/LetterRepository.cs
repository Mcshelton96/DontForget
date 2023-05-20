using DontForget.Models;
using DontForget.Utils;
using Microsoft.Extensions.Hosting;

namespace DontForget.Repositories
{
    public class LetterRepository : BaseRepository
    {
        public LetterRepository(IConfiguration configuration) : base(configuration) { }

        public List<Letter> GetAllLetters()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, userId, LetterTitle, LetterBody,
                       FROM Letter";

                    var reader = cmd.ExecuteReader();

                    var letters = new List<Letter>();
                    while (reader.Read())
                    {
                        letters.Add(new Letter()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            userId = DbUtils.GetInt(reader, "userId"),
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
                          SELECT Id, userId, LetterTitle, LetterBody,
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
                            userId = DbUtils.GetInt(reader, "userId"),
                            LetterTitle = DbUtils.GetString(reader, "LetterTitle"),
                            LetterBody = DbUtils.GetString(reader, "LetterBody"),
                        };
                    }

                    reader.Close();

                    return letter;
                }
            }
        }
    }
}
