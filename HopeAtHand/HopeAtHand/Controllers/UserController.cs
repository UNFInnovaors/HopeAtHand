using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    [Authorize]
    [Route("api/[controller]/[Action]")]
    public class UserController : Controller 
    {
        private readonly IUserManager userManager;
        private readonly AppSettings appSettings;
        
        public UserController(IUserManager userManager, IOptions<AppSettings> appSettings)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
        }

        public class CreateDTO
        {
            public string Username { get; set; }
        }
        public class LoginDTO
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
        [HttpPost]
        public IActionResult Reset([FromBody] ResetDTO reset)
        {
            var result = userManager.ResetPassword(reset);
            if(result == null)
            {
                return Ok("Bad");
            }
            return Ok("Ok");
        }
        [HttpPost]
        public IActionResult Change([FromBody] LoginDTO login)
        {
            var result = userManager.changePassword(login);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult RecieveUserData([FromBody] CreateDTO loginDTO)
        {
            Facilitator facilitator = userManager.DoesFacilitatorExist(loginDTO.Username);
            if(facilitator == null)
            {
                //userManager.CreateFacilitator(loginDTO.Username);
               return Ok($"A Fascilitator with the email {facilitator.Email} has been created");
            }
            return Ok("A User With This Email Already Exists");
        }
        [HttpPost]
        public IActionResult Create([FromBody] CreateUserDTO create)
        {
            var result = userManager.CreateFacilitator(create);
            return Ok();
        }
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            var result = (userManager.LogIn(login.Username, login.Password));
            if(result == null)
            {
                return Ok("Not Found");
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, result.Name),
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                NotBefore = DateTime.Now,
                IssuedAt = DateTime.Now,
                Expires = DateTime.Now.AddHours(5),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token), role = result.Role, changePassword = result.ChangePassword });
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(userManager.GetFacilitators());
        }

        [HttpPost]
        public IActionResult Search([FromBody] FascilitatorSearchDTO searchDTO)
        {
            return Ok(userManager.SearchForFacilitator(searchDTO.SearchString));
        }
        
        public IActionResult ChangeRole([FromBody] ChangeRoleDTO changeRole)
        {
            return Ok(userManager.ChangeRole(changeRole));
        }
        
        public IActionResult SearchByRole([FromBody] SearchRoleDTO searchRole)
        {
            return Ok(userManager.ByRole(searchRole.role));
        }
    }
}
