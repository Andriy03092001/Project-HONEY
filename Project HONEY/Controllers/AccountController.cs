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
        public async Task<ResultDto> Register([FromBody] UserRegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDto
                {
                    Status = 400,
                    Errors = CustomValidator.GetErrorsByModel(ModelState)
                };
            }

            var user = new User()
            {
                UserName = model.Email,
                Email = model.Email,
            };

            IdentityResult result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return new ResultErrorDto
                {
                    Status = 400,
                    Errors = CustomValidator.GetErrorsByIdentityResult(result)
                };
            }
            else
            {
                var userProfile = new UserAdditionalInfo
                {
                    Age = model.Age,
                    LastName = model.LastName,
                    Name = model.Name,
                    RegisteredDate = DateTime.Now.ToShortDateString()
                };
                _context.userAdditionalInfos.AddAsync(userProfile);
                result = _userManager.AddToRoleAsync(user, "User").Result;
                _context.SaveChanges();

                var token = _jwtTokenService.CreateToken(user);
            }

            return new ResultDto
            {
                Status = 200
            };
        }

        [HttpPost]
        [Route("login")]
        public async Task<ResultDto> Login([FromBody] UserLoginDto model)
        {
            if (!ModelState.IsValid)
            {
                if (!ModelState.IsValid)
                {
                    return new ResultErrorDto
                    {
                        Status = 400,
                        Errors = CustomValidator.GetErrorsByModel(ModelState)
                    };
                }
            }
            var result = await _signInManager
                .PasswordSignInAsync(model.Email, model.Password,
                false, false);

            if (!result.Succeeded)
            {
                List<string> temp = new List<string>();
                temp.Add("Неправильна електронна пошта або пароль");
                return new ResultErrorDto
                {
                    Status = 400,
                    Errors = temp
                };
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);

            return new ResultLoginDto
            {
                Status = 200,
                Token = _jwtTokenService.CreateToken(user)
            };
        }




    }
}
