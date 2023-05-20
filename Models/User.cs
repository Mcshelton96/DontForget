using System.ComponentModel.DataAnnotations;

namespace DontForget.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }

        [Required]
        public string? userName { get; set; }

        [Required] 
        public string? password { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Address { get; set; }

    }
}
