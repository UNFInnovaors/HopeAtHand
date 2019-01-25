using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public interface IUserManager{
        Facilitator DoesFacilitatorExist(string username);
        Facilitator CreateFacilitator(string username, string role = "Facilitator");
    }
    public class UserManager : IUserManager{
        private readonly ApplicationDbContext Data;
        public UserManager(ApplicationDbContext data){
            Data= data;
        }
        public Facilitator DoesFacilitatorExist(string username){
            return Data.Facilitators.Where( f => f.Username == username).FirstOrDefault();
        }

        public Facilitator CreateFacilitator(string username, string role = "Facilitator"){
            Facilitator facilitator = new Facilitator()
            {
                Role = role,
                Username = username
            };
            Data.Add(facilitator);
            Data.SaveChanges();
            return facilitator;
        }
    }
}