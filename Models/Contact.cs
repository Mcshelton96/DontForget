using System.ComponentModel.DataAnnotations;

namespace DontForget.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string ContactName { get; set; }

        [Required]
        public string? ContactMembers { get; set; }

        [Required]
        public string ContactAddress { get; set; }

        public DateOnly ContactBirthday { get; set; }

    }
}
