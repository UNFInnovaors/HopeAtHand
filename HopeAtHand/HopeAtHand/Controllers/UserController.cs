using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class UserController : Controller 
    {
        private readonly IUserManager userManager;
        
        public UserController(IUserManager userManager)
        {
            this.userManager = userManager;
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
            return Ok(result);
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
