using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
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
    }
}
