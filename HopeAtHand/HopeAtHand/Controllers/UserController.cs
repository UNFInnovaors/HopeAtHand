using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
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

        public class LoginDTO
        {
            public string Username { get; set; }
        }

        [HttpPost]
        public IActionResult RecieveUserData([FromBody] LoginDTO loginDTO)
        {
            Facilitator facilitator = userManager.DoesFacilitatorExist(loginDTO.Username);

            if(facilitator == null)
            {
               facilitator = userManager.CreateFacilitator(loginDTO.Username);
            }
            
            return Ok(facilitator);
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
