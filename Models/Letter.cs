using System.ComponentModel.DataAnnotations;

namespace DontForget.Models
{
    public class Letter
    {
        public int Id { get; set; }

        [Required]
        public int userId { get; set; }

        [Required]
        public string LetterTitle { get; set; }

        [Required]
        public string LetterBody { get; set;}
    }
}
