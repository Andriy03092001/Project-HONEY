using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Project_IDA.Domain.Interfaces;
using Project_student.DTO.Models;
using Project_student.DTO.Models.Result;
using Project_STUDENTS.DataAccess.Entity;
using Project_STUDENTS_API___Angular.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_HONEY.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJWTTokenService _jwtTokenService;

        public AccountController(
            EFContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IJWTTokenService jWtTokenService)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
            _jwtTokenService = jWtTokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Wrong password or mail" );
            }

            var user = new User()
            {
                UserName = model.Email,
                Email = model.Email,
            };

            IdentityResult result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(CustomValidator.GetErrorsByIdentityResult(result));
            }
            else
            {
                var userProfile = new UserAdditionalInfo
                {
                    Id = user.Id,
                    Age = model.Age,
                    LastName = model.LastName,
                    Name = model.Name,
                    RegisteredDate = DateTime.Now.ToShortDateString()
                };
                await _context.userAdditionalInfos.AddAsync(userProfile);
                await _userManager.AddToRoleAsync(user, "User");
                _context.SaveChanges();
                return Ok(
                    new
                    {
                    token = _jwtTokenService.CreateToken(user)
                });
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto model)
        {
            if (!ModelState.IsValid)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Incorrect login data");
                }
            }
            var result = await _signInManager
                .PasswordSignInAsync(model.Email, model.Password,
                false, false);

            if (!result.Succeeded)
            {
                return BadRequest("Wrong password or mail" );
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(
          new
          {
              token = _jwtTokenService.CreateToken(user)
          });
        }
    }
}
