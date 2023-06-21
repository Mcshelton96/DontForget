using Microsoft.AspNetCore.Mvc;
using DontForget.Repositories;
using DontForget.Models;
using Microsoft.AspNetCore.Authorization;

namespace DontForget.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var loggInUser = User;

            return Ok(_userRepository.GetById(id));
            //var user = _userRepository.GetById(id);
            //if (user == null)
            //{
            //    return NotFound();
            //}
            //return Ok(user);
        }

        [HttpGet("user")]
        public IActionResult GetByFireBaseKey()
        {
            var firebasekey = User.Claims.FirstOrDefault(x => x.Type=="user_id")?.Value ?? "";
            var user = _userRepository.GetByFireBaseKey(firebasekey);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user); 
        }


        // POST api/<UserController>
        [HttpPost]
        public IActionResult AddUser(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(user);
            return NoContent();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return NoContent();
        }
    }
}
