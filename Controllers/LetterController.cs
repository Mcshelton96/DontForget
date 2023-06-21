using DontForget.Models;
using DontForget.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DontForget.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LetterController : ControllerBase
    {
        private readonly ILetterRepository _letterRepository;
        private readonly IUserRepository _userRepository;
        public LetterController(ILetterRepository letterRepository, IUserRepository userRepository)
        {
            _letterRepository = letterRepository;
            _userRepository = userRepository;
        }
        // GET: api/<LetterController>
        [HttpGet]
        public IActionResult Get()
        {
            var firebasekey = User.Claims.FirstOrDefault(x => x.Type == "user_id")?.Value ?? "";
            var user = _userRepository.GetByFireBaseKey(firebasekey);
            if (user == null) { return NotFound("User Does Not Exist"); }
            return Ok(_letterRepository.GetAllLettersByUser(user.Id));
        }

        // GET api/<LetterController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var letter = _letterRepository.GetById(id);
            if (letter == null)
            {
                return NotFound();
            }
            return Ok(letter);
        }

        // POST api/<LetterController>
        [HttpPost]
        public IActionResult Letter(Letter letter)
        {
            var firebasekey = User.Claims.FirstOrDefault(x => x.Type == "user_id")?.Value ?? "";
            var user = _userRepository.GetByFireBaseKey(firebasekey);
            if (user == null) { return NotFound("User Does Not Exist"); }
            letter.UserId=user.Id;
            _letterRepository.Add(letter);
            return CreatedAtAction("Get", new { id = letter.Id }, letter);
        }

        // PUT api/<LetterController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Letter letter)
        {
            if (id != letter.Id)
            {
                return BadRequest();
            }

            _letterRepository.Update(letter);
            return NoContent();
        }

        // DELETE api/<LetterController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _letterRepository.Delete(id);
            return NoContent();
        }
    }
}
