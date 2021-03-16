using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_HONEY.Domain.Interfaces;
using Project_HONEY.DTO.Models;
using Project_HONEY.Helper;
using Project_IDA.Domain.Interfaces;
using Project_student.DTO.Models;
using Project_STUDENTS.DataAccess.Entity;
using Project_STUDENTS_API___Angular.Helper;
using ProjectHONEY.Helper;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Project_HONEY.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IJWTTokenService jwtTokenService;
        private readonly IFacebookAuthService facebookAuthService;



        public AccountController(
            EFContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IJWTTokenService jWtTokenService,
            IFacebookAuthService facebookAuthService)
        {
            this.userManager = userManager;
            this.context = context;
            this.signInManager = signInManager;
            jwtTokenService = jWtTokenService;
            this.facebookAuthService = facebookAuthService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Wrong password or mail");
            }

            var emailCheck = context.Users.FirstOrDefault(t => t.Email == model.Email);
            if (emailCheck != null)
            {
                return BadRequest("Email already exists");
            }

            var user = new User()
            {
                UserName = model.Email,
                Email = model.Email,
                Age = model.Age,
                LastName = model.LastName,
                Name = model.Name,
                RegisteredDate = DateTime.Now.ToShortDateString()
            };

            IdentityResult result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(CustomValidator.GetErrorsByIdentityResult(result));
            }


            await userManager.AddToRoleAsync(user, "User");
            context.SaveChanges();

            var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.Action(
                "ConfirmEmail",
                "Account",
                new { userId = user.Id, code = code },
                protocol: HttpContext.Request.Scheme);
            EmailService emailService = new EmailService();
            await emailService.SendEmail(model.Email, "Confirm your account",
                $"Confirm registration by clicking on the lin: <a href='{callbackUrl}'>link</a>");


            return Ok(
                new
                {
                    token = jwtTokenService.CreateToken(user)
                });
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
            var result = await signInManager
                .PasswordSignInAsync(model.Email, model.Password,
                false, false);

            if (!result.Succeeded)
            {
                return BadRequest("Wrong password or mail");
            }
            var user = await userManager.FindByEmailAsync(model.Email);
            await signInManager.SignInAsync(user, isPersistent: false);

            return Ok(
          new
          {
              token = jwtTokenService.CreateToken(user)
          });
        }

        [HttpPost]
        [Route("facebook-login")]
        public async Task<IActionResult> LoginWithFacebookAsync([FromBody] UserFacebookLoginDTO model)
        {
            var validatedTokenReslt = await facebookAuthService.ValidateAccessTokenAsync(model.accessToken);
            if (!validatedTokenReslt.Data.is_valid)
            {
                return BadRequest("Incorrect facebook login");
            }
            else
            {
                var userInfo = await facebookAuthService.GetUserInfoAsync(model.accessToken);

                var user = await userManager.FindByEmailAsync(userInfo.email);
                if (user == null)
                {
                    var identityUser = new User
                    {

                        Email = userInfo.email,
                        UserName = userInfo.email,
                        Name = userInfo.first_name,
                        LastName = userInfo.last_name
                    };

                    var createdResult = await userManager.CreateAsync(identityUser);
                    if (!createdResult.Succeeded)
                    {
                        return BadRequest("Incorrect facebook login");
                    }
                    else
                    {
                        return Ok(new
                        {
                            token = jwtTokenService.CreateToken(user)
                        });
                    }
                }
                return Ok(new
                {
                    token = jwtTokenService.CreateToken(user)
                });
            }
           

        }


    }
}
