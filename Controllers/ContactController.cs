using DontForget.Models;
using DontForget.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DontForget.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;
        public ContactController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }
        // GET: api/<ContactController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_contactRepository.GetAllContacts());
        }

        // GET api/<ContactController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var contact = _contactRepository.GetById(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        // POST api/<ContactController>
        [HttpPost]
        public IActionResult Contact(Contact contact)
        {
            _contactRepository.Add(contact);
            return CreatedAtAction("Get", new { id = contact.Id }, contact);
        }

        // PUT api/<ContactController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            _contactRepository.Update(contact);
            return NoContent();
        }

        // DELETE api/<ContactController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _contactRepository.Delete(id);
            return NoContent();
        }
    }
}
