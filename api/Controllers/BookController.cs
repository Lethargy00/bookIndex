using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/api/book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepo;
        public BookController(IBookRepository bookRepo) {
            _bookRepo = bookRepo;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            var books = await _bookRepo.GetAllAsync();

            return Ok(books);
        }
        // GET api/book/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var post = await _bookRepo.GetByIdAsync(id);

            if (post == null){
                return NotFound();
            }

            return Ok(post);
        }

        // POST api/book
        [HttpPost]
        public async Task<ActionResult<Book>> CreatePost([FromBody] Book post)
        {
            await _bookRepo.CreateAsync(post);
            return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
        }

        // PUT api/book/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePost([FromRoute] int id, [FromBody] Book post)
        {
            var postModel = await _bookRepo.UpdateAsync(id, post);

            if (postModel == null) {
                return NotFound();
            }

            return Ok(postModel);
        }

        // DELETE api/book/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePost([FromRoute] int id)
        {
            var postModel = await _bookRepo.DeleteAsync(id);

            if (postModel == null) 
            {
                return NotFound();
            }

            return NoContent();
        }
    }



}